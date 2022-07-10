const path = require('path');
const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const router = require('./router');
const { sessionSecret, dbUri } = require('./config/config.default');

const app = express();
const PORT = process.env.PORT || 3000;

//! 配置解析请求体数据 application/json
app.use(express.json());

//! 配置解析请求体数据 application/x-www-form-urlencoded
app.use(express.urlencoded());

//! 日志配置
app.use(morgan('dev'));

//! 配置静态资源
app.use('/public', express.static(path.join(__dirname, 'public'), { index: ['index.html']}));

//! 配置模板引擎
// 当渲染以.art 结尾的文件时使用 express-art-template
app.engine('art', require('express-art-template'));
// art-template 模板引擎配置
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
});
// 模板文件的存储目录
app.set('views', path.join(__dirname, 'views'));
// 可以省略模板文件的后缀名
app.set('view engine', 'art');

//! 配置 session 
//  存储 session
//     1.生产 session id
//     2.存储 session
//     3.req.session.xxx = xxxx
//  获取 session
//     1.根据 session id 获取 session 中的数据
//     2.req.session.xxx
//  ⚠️ 默认存储到内存中
//  ⚠️ 过期时间默认是 根据 cookie 确定的
app.use(session({
  secret: sessionSecret,   // 生产session id 的密钥
  resave: false,           //
  saveUninitialized: true, //
  cookie: {                // 保存 session id 的 cookie 设置
    secure: false,         // 值为 true 只有 https 下有效
    maxAge: 1000 * 60 * 60 * 24 // 过期时间，单位毫秒
  },
  store: MongoStore.create({
    mongoUrl: dbUri
  })
}))

//! 统一给模板添加数据
app.use((req, res, next) => {
  app.locals.sessionUser = req.session.user;
  next();
})

//! 路由配置
app.use(router);

//! 统一错误处理
if (process.env.NODE_ENV !== 'production') {
  // only use in development
  app.use(errorhandler())
}

app.listen(PORT, () => {
  const yellowBright = chalk.yellowBright;
  const green = chalk.green;
  console.log(`
    ${yellowBright('Local Server running at:')}
    http://localhost:${green(PORT)}
    http://127.0.0.1:${green(PORT)}
    Hit CTRL-C to stop the server
  `);
});