const Service = require('egg').Service;
class CommentsService extends Service {
    async addCommon(com) {
        if (com.userid && com.articleid && com.content) {
            let userinfo = {
                content: com.content,
                created_time: new Date(),
                userid: com.userid,
                articleid: com.articleid,
                commentSize: 0
            }
            let result = await this.app.mysql.insert('comments', userinfo)
            if (result.affectedRows === 1) {
                return {
                    code: 0
                }
            }
            return {
                msg: `failed`,
                codde: 1
            }

        } else {
            return {
                msg: `不能为空`,
                codde: 1
            };
        }
    }
    async getCommon(com) {
        if (com.articleid) {
            let result = await this.app.mysql.select('comments', {
                articleid: com.articleid
            })
            return {
                data: result,
                code: 0
            };
        }
        return {
            msg: `不能为空`,
            code: 1
        };

    }
    async getReply(reply) {
        if (reply.commentid) {
            let result = await this.app.mysql.select('reply', {
                commentid: reply.commentid
            })
            return {
                data: result,
                code: 0
            };
        }
        return {
            msg: `不能为空`,
            code: 1
        };

    }
    async replyAdd(reply) {
        if (reply.commentid && reply.content && reply.userid && reply.articleid) {
            let userinfo = {
                content: reply.content,
                created_time: new Date(),
                userid: reply.userid,
                articleid: reply.articleid,
                commentid: reply.commentid
            }
            let result = await this.app.mysql.insert('reply', userinfo)
            return {
                data: result,
                code: 0
            };
        }
        return {
            msg: `不能为空`,
            code: 0
        };

    }
}
module.exports = CommentsService;