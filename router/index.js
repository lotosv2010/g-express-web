const express = require('express');

const router = express.Router();

// 用户
router.use(require('./user'));

// 文章
router.use(require('./article'));

module.exports = router;