const express = require('express');
const articleCtrl = require('../controller/article');

const router = express.Router();

router.get('/', articleCtrl.showHome);

router.get('/article/:articleId', articleCtrl.showArticle);

router.get('/editor', articleCtrl.showEditor);

router.get('/editor/:articleId', articleCtrl.showEditor);

module.exports = router;