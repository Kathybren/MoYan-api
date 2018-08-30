'use strict';

const Controller = require('egg').Controller;

class BlogController extends Controller {
    async add() {
        let params = this.ctx.request.body
        let result = await this.ctx.service.blogs.add(params)
        this.ctx.body = result; 
    }
    async getblogs() {
        let params = this.ctx.request.body
        let result = await this.ctx.service.blogs.getblogs(params)
        this.ctx.body = result; 
    }
    async getHeartblogs() {
        let params = this.ctx.request.body
        let result = await this.ctx.service.blogs.getHeartblogs(params)
        this.ctx.body = result; 
    }
    async getDetail() {
        let query = this.ctx.query;
        let result = await this.ctx.service.blogs.getDetail(query)
        this.ctx.body = result; 
    }
    async search() {
        let query = this.ctx.query;
        let result = await this.ctx.service.blogs.search(query)
        this.ctx.body = result; 
    }
    async operate() {
        let params = this.ctx.request.body
        let result = await this.ctx.service.blogs.operate(params)
        this.ctx.body = result; 
    }
}
module.exports = BlogController;