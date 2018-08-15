'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
    async addCommon() {
        let params = this.ctx.request.body
        const result = await this.ctx.service.comment.addCommon(params)
        this.ctx.body = result; 
    }
    async getCommon() {
        let params = this.ctx.request.body
        const result = await this.ctx.service.blogs.getCommon(params)
        this.ctx.body = result; 
    }
    async getReply() {
        let params = this.ctx.query
        const result = await this.ctx.service.blogs.getReply(params)
        this.ctx.body = result; 
    }
    async replyAdd() {
        let params = this.ctx.request.body
        const result = await this.ctx.service.blogs.replyAdd(params)
        this.ctx.body = result; 
    }
}
module.exports = CommentController;