module.exports = async (req, res, next) => {
  const sessionUser = req.session.user;
  if(sessionUser) {
    return next();
  }
  // 重定向
  res.redirect('/login');
}