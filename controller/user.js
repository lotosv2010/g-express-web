const { User } = require('../model');

exports.showLogin = async (req, res, next) => {
  try {
    res.render('login', {
      isLogin: true,
      title: 'Sign in'
    });
  } catch (error) {
    next(error);
  }
};

exports.showRegister = async (req, res, next) => {
  try {
    res.render('login', {
      isLogin: false,
      title: 'Sign up'
    });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    // 数据验证
    // 验证通过，创建用户
    let user = await User.create(req.body.user);
    user = user.toJSON();
    // 保持登陆状态
    req.session.user = user;
    // 跳转到首页
    Reflect.deleteProperty(user, 'password');
    res.status(201).json({
      user
    });
  } catch (error) {
    next(error);
  }
};

exports.showProfile = async (req, res, next) => {
  try {
    res.render('profile');
  } catch (error) {
    next(error);
  }
};

exports.showSettings = async (req, res, next) => {
  try {
    res.render('settings');
  } catch (error) {
    next(error);
  }
};