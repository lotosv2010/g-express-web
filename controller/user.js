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