const express = require('express');
const userCtrl = require('../controller/user');
const userValidator = require('../validator/user');
const auth = require('../middleware/auth');
const noAuth = require('../middleware/no-auth');

const router = express.Router();

//! 页面
router.get('/login', noAuth, userCtrl.showLogin);

router.get('/register', noAuth, userCtrl.showRegister);

router.get('/profile/:username', auth, userCtrl.showProfile);

router.get('/profile/:username/favorites', userCtrl.showProfile);

router.get('/settings', userCtrl.showSettings);

//! 接口
router.post('/register', userValidator.register, userCtrl.register);

router.get('/logout', userCtrl.logout);

router.post('/login', noAuth , userValidator.login, userCtrl.login);


module.exports = router;