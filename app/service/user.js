const Service = require('egg').Service
const {
  ERROR, 
  SUCCESS, 
} = require('../util/util'); 
const bcrypt = require('bcryptjs')

class UserService extends Service {
    async login(params) {
      const result = await this.app.mysql.get('user',  {username:params.username})
      if (result === null) {
        this.ctx.status = 400; 
        return Object.assign(ERROR,  {
          msg:'user not found', 
        }); 
      }
      if (bcrypt.compareSync(params.password, result.password)) {
        const userInfo = {
          userName: result.username,
          id: result.userid
        }
        const token = this.app.jwt.sign(userInfo, this.app.config.jwt.secret)
        return Object.assign(SUCCESS,  {token}, {userid:result.userid});
      } else {
        return Object.assign(ERROR,  {
          msg: 'password is error' 
        }); 
      }
    }
    async singup(user) {
      if ( ! user.username ||  ! user.password) {
        this.ctx.status = 400; 
        return Object.assign(ERROR,  {
          msg:`expected an object with username, password but got null`, 
        }); 
      }
      const userDb = await this.app.mysql.get('user',  {username:user.username})
      if (userDb !== null) {
        this.ctx.status = 201; 
        return Object.assign(SUCCESS,  {
          msg:`username already exists`, 
        }); 
      }
      const salt = await bcrypt.genSaltSync(10)
      const pwd = bcrypt.hashSync(user.password, salt)
      let userinfo =  {
        created_time:new Date(), 
        auth:1, 
        username:user.username, 
        password:pwd
      }
      const result = await this.app.mysql.insert('user', userinfo)
      if (result.affectedRows === 1) {
        return SUCCESS
      }else {
        return ERROR
      }
    }
}
module.exports = UserService; 