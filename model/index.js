const mongoose = require('mongoose');
const chalk = require('chalk');
const { dbUri } = require('../config/config.default');

// todo：1 连接数据库
const conn = mongoose.createConnection(dbUri);
conn.on('error', (error) => console.log(chalk.red.bold('数据库连接失败：' + error.message)));
conn.on('open', () => console.log(chalk.green.bold('数据库连接成功!')));

// todo：3 Model
// 组织导出模型类
module.exports = {
  User: conn.model('User', require('./user')),
}