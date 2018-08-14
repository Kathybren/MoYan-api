const Service = require('egg').Service
const {
  ERROR, 
  SUCCESS, 
} = require('../util/util'); 
class CommentsService extends Service {
    async addCommon(com) {
        if (com.userId&&com.blogid&&com.content) {
            const userinfo = {
                content: com.content,
                created_time: new Date(),
                userId: com.userId,
                blogid: com.blogid
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