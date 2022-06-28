exports.showHome = async (req, res, next) => {
  try {
    res.render('index');
  } catch (error) {
    next(error);
  }
};

exports.showArticle = async (req, res, next) => {
  try {
    res.render('article');
  } catch (error) {
    next(error);
  }
};

exports.showEditor = async (req, res, next) => {
  try {
    res.render('editor');
  } catch (error) {
    next(error);
  }
};