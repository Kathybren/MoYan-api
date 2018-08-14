const Service = require('egg').Service
const {
  ERROR, 
  SUCCESS, 
} = require('../util/util'); 
class BlogsService extends Service {
    async add(blog) {
        if (blog.userid&&blog.title&&blog.content&&blog.tags) {
            const userinfo = {
                title: blog.title,
                content: blog.content,
                tags: blog.tags,
                created_time: new Date(),
                userid: blog.userid,
            }
            const result = await this.app.mysql.insert('blogs', userinfo)
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
    async getblogs(info) {
        const result = await this.app.mysql.select('blogs', {
            columns: ['title','content','tags','userId'],
            limit:parseInt(info.pageSize),
            offset: (parseInt(info.pageNum-1))*parseInt(info.pageSize)
        })
        return Object.assign(SUCCESS,  {
            data:result, 
        }); 
        // console.log(result.length)
    }
    async getHeartblogs(info) {
        const result = await this.app.mysql.query(`SELECT ht.commentid,ht.heartid,bg.* FROM heart ht inner join blogs bg on ht.blogid = bg.blogid WHERE ht.commentid = ${info.userId}`)
        return Object.assign(SUCCESS,  {
            data:result
        }); 
        // console.log(result.length)
    }
    async getDetail(info) {
        const result = await this.app.mysql.get('blogs',{
            articleid: parseInt(info.articleid)
        })
        return Object.assign(SUCCESS,  {
            data:result
        }); 
        // console.log(result.length)
    }
    async search(info) {
        let sql = `SELECT * FROM blogs where title like "%${info.name}%"`
        const result = await this.app.mysql.query(sql)
        return Object.assign(SUCCESS,  {
            data:result
        });
    }
    async operate(info) {
        console.log(info)
        if (info.type&&info.articleid&&info.commentid) {
            let sql = ''
            const userinfo = {
                userid: info.commentid,
                articleid: info.articleid
            }
            let result1 = null
            if (info.type === 'add') {
                result1 = await this.app.mysql.insert('heart', userinfo)
                sql = `update blogs set heartSize=heartSize+1 where articleid=${parseInt(info.articleid)}`   
            } else {
                result1 = await this.app.mysql.delete('heart', userinfo)
                sql = `update blogs set heartSize=heartSize-1 where articleid=${parseInt(info.articleid)}`   
            }
            const result = await this.app.mysql.query(sql)
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
        // let sql = `SELECT * FROM blogs where title like "%${info.name}%"`
        // const result = await this.app.mysql.query(sql)
        // return Object.assign(SUCCESS,  {
        //     data:result
        // });
    }
}
module.exports = BlogsService