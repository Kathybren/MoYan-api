const Service = require('egg').Service
class BlogsService extends Service {
  async add(blog) {
    if (blog.userid && blog.title && blog.content) {
      let userinfo = {
        title: blog.title,
        content: blog.content,
        tags: blog.tags,
        created_time: new Date(),
        userid: blog.userid,
        isHeart: 0,
        commentSize: 0,
        heartSize: 0,
        readSize: 0,
        name: this.app.username
      }
      let result = await this.app.mysql.insert('blogs', userinfo)
      if (result.affectedRows === 1) {
        return {
          code: 0,
          msg: 'success',
        }
      } else {
        return {
          code: 1,
          msg: 'failed',
        }
      }
    } else {
      return {
        code: 1,
        msg: `不能为空`,
      };
    }
  }
  async getblogs(info) {
    if (!info.pageNum || !info.pageSize) {
      return {
        code: 1,
        msg: `expected an object with username, password but got null`
      };
    }
    let result = await this.app.mysql.select('blogs', {
      columns: ['title', 'heartSize', 'commentSize', 'tags', 'articleid', 'isHeart', 'created_time', 'name'],
      orders: [
        ['created_time', 'desc']
      ],
      limit: parseInt(info.pageSize),
      offset: (parseInt(info.pageNum - 1)) * parseInt(info.pageSize)
    })
    let id = info.userid
    if (id) {
      let articleid = await this.app.mysql.select('heart', {
        userid: id
      })
      let arr = []
      if (articleid.length > 0) {
        articleid.forEach(item => {
          arr.push(item.articleid)
        })
        result.forEach(item => {
          if (arr.indexOf(item.articleid) !== -1) {
            item.isHeart = 1
          }
        })
      }
    }
    // let arr = [1,2,3]
    // let arr1 = [{is:0,id:1},{is:0,id:4},{is:0,id:5},{is:0,id:6}]
    // arr1.forEach(item=>{
    //     if (arr.indexOf(item.id) !==-1) {
    //         item.is =1
    //     }
    // })
    return {
      code: 0,
      msg: 'success',
      data: result
    };
  }
  async getHeartblogs(info) {
    let result = await this.app.mysql.query(`SELECT ht.commentid, ht.heartid, bg. * FROM heart ht inner join blogs bg on ht.blogid = bg.blogid WHERE ht.commentid = $ {info.userId}`)
    return Object.assign({
      code: 0,
      msg: 'success',
    }, {
      data: result
    });
    // console.log(result.length)
  }
  async getDetail(info) {
    let result = await this.app.mysql.get('blogs', {
      articleid: parseInt(info.articleid)
    })
    return Object.assign({
      code: 0,
      msg: 'success',
    }, {
      data: result
    });
    // console.log(result.length)
  }
  async search(info) {
    let sql = `SELECT * FROM blogs where title like "%${info.name}%"`
    let result = await this.app.mysql.query(sql)
    return Object.assign({
      code: 0,
      msg: 'success',
    }, {
      data: result
    });
  }
  async operate(info) {
    console.log(info)
    if (info.type && info.articleid && info.commentid) {
      let sql = ''
      let userinfo = {
        userid: info.commentid,
        articleid: info.articleid
      }
      if (info.type === 'add') {
        result1 = await this.app.mysql.insert('heart', userinfo)
        sql = `update blogs set heartSize = heartSize + 1 where articleid = $ {parseInt(info.articleid)}`
      } else {
        result1 = await this.app.mysql.delete('heart', userinfo)
        sql = `update blogs set heartSize = heartSize-1 where articleid = $ {parseInt(info.articleid)}`
      }
      let result = await this.app.mysql.query(sql)
      if (result.affectedRows === 1) {
        return {
          code: 0,
          msg: 'success',
        }
      } else {
        return {
          code: 1,
          msg: 'failed',
        }
      }
    } else {
      return Object.assign({
        code: 1,
        msg: 'failed',
      }, {
        msg: `不能为空`,
      });
    }
    // let sql = `SELECT * FROM blogs where title like "%${info.name}%"`
    // let result = await this.app.mysql.query(sql)
    // return Object.assign(SUCCESS,  {
    //     data:result
    // });
  }
}
module.exports = BlogsService