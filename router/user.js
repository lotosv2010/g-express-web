const express = require('express');
const userCtrl = require('../controller/user');

const router = express.Router();

router.get('/login', userCtrl.showLogin);

router.get('/register', userCtrl.showRegister);

router.get('/profile/:username', userCtrl.showProfile);

router.get('/profile/:username/favorites', userCtrl.showProfile);

router.get('/settings', userCtrl.showSettings);


module.exports = router;