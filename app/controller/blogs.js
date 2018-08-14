'use strict';

const Controller = require('egg').Controller;

class BlogController extends Controller {
    async add() {
        let params = this.ctx.request.body
        const result = await this.ctx.service.blogs.add(params)
        this.ctx.body = result; 
    }
    async getblogs() {
        let params = this.ctx.request.body
        const result = await this.ctx.service.blogs.getblogs(params)
        this.ctx.body = result; 
    }
    async getHeartblogs() {
        let params = this.ctx.request.body
        const result = await this.ctx.service.blogs.getHeartblogs(params)
        this.ctx.body = result; 
    }
    async getDetail() {
        const query = this.ctx.query;
        const result = await this.ctx.service.blogs.getDetail(query)
        this.ctx.body = result; 
    }
    async search() {
        const query = this.ctx.query;
        const result = await this.ctx.service.blogs.search(query)
        this.ctx.body = result; 
    }
    async operate() {
        let params = this.ctx.request.body
        const result = await this.ctx.service.blogs.operate(params)
        this.ctx.body = result; 
    }
}
module.exports = BlogController;