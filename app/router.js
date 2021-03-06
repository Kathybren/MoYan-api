'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/auth/login', controller.user.login);
  router.post('/auth/singup', controller.user.singup);
  router.post('/blog/add', controller.blogs.add);
  router.post('/blog/get', controller.blogs.getblogs);
  router.get('/blog/getDetail', controller.blogs.getDetail);
  router.get('/blog/search', controller.blogs.search);
  router.get('/comment/get', controller.comment.getCommon);
  router.get('/comment/getReply', controller.comment.getReply);
  router.post('/comment/add', controller.comment.addCommon);
  // router.post('/comment/replyAdd', controller.comment.addCommon);
  router.post('/heart/operate', controller.blogs.operate);
};
