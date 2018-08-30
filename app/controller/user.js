'use strict'; 
const Controller = require('egg').Controller; 
class LoginController extends Controller {
  async login() {
    // const result = await this.ctx.service.user.find()
    // const result = await this.app.mysql.insert('user', { id: 12, name: '黄凯1', age: 19, sex: '男' });
    const params = this.ctx.request.body; 
    const result = await this.ctx.service.user.login(params); 
    this.ctx.body = result; 
  }
  async singup() {
    const params = this.ctx.request.body; 
    const result = await this.ctx.service.user.singup(params); 
    this.ctx.body = result; 
  }
}
module.exports = LoginController; 
