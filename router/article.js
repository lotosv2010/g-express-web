const express = require('express');
const articleCtrl = require('../controller/article');
const auth = require('../middleware/auth');
const articleValidator = require('../validator/article');

const router = express.Router();

//! 页面
router.get('/', articleCtrl.showHome);

router.get('/article/:articleId', auth, articleCtrl.showArticle);

router.get('/editor', auth, articleCtrl.showEditor);

router.get('/editor/:articleId', auth, articleCtrl.showEditor);

//! 接口
/**
 * Create Article
 */
 router.post('/articles', articleValidator.createArticle, articleCtrl.createArticles);


module.exports = router;