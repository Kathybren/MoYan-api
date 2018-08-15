const Service = require('egg').Service
const {
  ERROR, 
  SUCCESS, 
} = require('../util/util'); 
class CommentsService extends Service {
    async addCommon(com) {
        if (com.userid&&com.articleid&&com.content) {
            const userinfo = {
                content: com.content,
                created_time: new Date(),
                userid: com.userid,
                articleid: com.articleid,
                commentSize: 0
            }
            const result = await this.app.mysql.insert('comments', userinfo)
            if (result.affectedRows === 1) {
                return SUCCESS
            }else {
                return ERROR
            }
        } else {
            return Object.assign(SUCCESS,  {
                msg:`不能为空`, 
            }); 
        }
    }
    async getCommon(com) {
        if (com.articleid) {
            const result = await this.app.mysql.select('comments', {articleid: com.articleid})
            return Object.assign(SUCCESS,  {
                data:result
            }); 
        } else {
            return Object.assign(SUCCESS,  {
                msg:`不能为空`, 
            }); 
        }
    }
    async getReply(reply) {
        if (reply.commentid) {
            const result = await this.app.mysql.select('reply', {commentid: reply.commentid})
            return Object.assign(SUCCESS,  {
                data:result
            }); 
        } else {
            return Object.assign(SUCCESS,  {
                msg:`不能为空`, 
            }); 
        }
    }
    async replyAdd(reply) {
        if (reply.commentid&&reply.content&&reply.userid&&reply.articleid) {
            const userinfo = {
                content: reply.content,
                created_time: new Date(),
                userid: reply.userid,
                articleid: reply.articleid,
                commentid: reply.commentid
            }
            const result = await this.app.mysql.insert('reply', userinfo)
            return Object.assign(SUCCESS,  {
                data:result
            }); 
        } else {
            return Object.assign(SUCCESS,  {
                msg:`不能为空`, 
            }); 
        }
    }
}
module.exports = CommentsService