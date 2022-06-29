const express = require('express');
const articleCtrl = require('../controller/article');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', articleCtrl.showHome);

router.get('/article/:articleId', auth, articleCtrl.showArticle);

router.get('/editor', auth, articleCtrl.showEditor);

router.get('/editor/:articleId', auth, articleCtrl.showEditor);

module.exports = router;