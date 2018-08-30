'use strict'; 
const Service = require('egg').Service; 
const bcrypt = require('bcryptjs'); 

class UserService extends Service {
  async login(params) {
    const result = await this.app.mysql.get('user',  {username:params.username }); 
    if (result === null) {
      this.ctx.status = 400; 
      return Object.assign( {
        code:1, 
        msg:'failed', 
      },  {
        msg:'user not found', 
      }); 
    }
    if (bcrypt.compareSync(params.password, result.password)) {
      const userInfo =  {
        userName:result.username, 
        id:result.userid, 
      }; 
      const token = this.app.jwt.sign(userInfo, this.app.config.jwt.secret); 
      this.app.username = params.username; 
      return Object.assign( {
        code:0, 
        msg:'success', 
      },  {token },  {userid:result.userid, username:result.username }); 
    }
    return Object.assign( {
      code:1, 
      msg:'failed', 
    },  {
      msg:'password is error', 
    }); 
  }
  async singup(user) {
    if ( ! user.username ||  ! user.password) {
      this.ctx.status = 400; 
      return Object.assign( {
        code:1, 
        msg:'failed', 
      },  {
        msg:'expected an object with username, password but got null', 
      }); 
    }
    const userDb = await this.app.mysql.get('user',  {username:user.username }); 
    if (userDb !== null) {
      this.ctx.status = 201; 
      return Object.assign( {
        code:1, 
        msg:'failed', 
      },  {
        msg:'username already exists', 
      }); 
    }
    const salt = await bcrypt.genSaltSync(10); 
    const pwd = bcrypt.hashSync(user.password, salt); 
    const userinfo =  {
      created_time:new Date(), 
      auth:1, 
      username:user.username, 
      password:pwd, 
    }; 
    const result = await this.app.mysql.insert('user', userinfo); 
    if (result.affectedRows === 1) {
      return {
        code:0, 
        msg:'success', 
      }; 
    }
    return {
      code:1, 
      msg:'failed', 
    }; 
  }
}
module.exports = UserService; 
