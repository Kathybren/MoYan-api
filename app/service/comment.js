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
                articleid: com.articleid
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
        if (com.userId&&com.blogid&&com.content) {
            const userinfo = {
                content: com.content,
                created_time: new Date(),
                userid: com.userid,
                articleid: com.articleid
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
}
module.exports = CommentsService