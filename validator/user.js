const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { User } = require('../model');
const md5 = require('../util/md5');

//! 数据验证
exports.register = validate([
  //! 1.配置验证规则
  body('user.username')
    .notEmpty().withMessage('用户名不能为空')
    .bail() // 前面验证不通过就不往下继续
    .custom(async (username) => { // 自定义校验
      const ret = await User.findOne({ username });
      if (ret) {
        return Promise.reject('用户名已存在');
      }
    }),
  body('user.password').notEmpty().withMessage('密码不能为空'),
  body('user.email')
    .notEmpty().withMessage('邮箱不能为空')
    .isEmail().withMessage('邮箱格式不正确')
    .bail()
    .custom(async (email) => {
      const ret = await User.findOne({ email });
      if (ret) {
        return Promise.reject('邮箱已存在');
      }
    })
]);