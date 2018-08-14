'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
    async addCommon() {
        let params = this.ctx.request.body
        const result = await this.ctx.service.comment.addCommon(params)
        this.ctx.body = result; 
    }
    // async getblogs() {
    //     let params = this.ctx.request.body
    //     const result = await this.ctx.service.blogs.getblogs(params)
    //     this.ctx.body = result; 
    // }
}
module.exports = CommentController;