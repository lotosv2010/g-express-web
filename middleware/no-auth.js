module.exports = async (req, res, next) => {
  const sessionUser = req.session.user;
  if(sessionUser) {
    // 登陆了访问登陆和注册，重定向到首页
    return res.redirect('/');
  }
  next();
}