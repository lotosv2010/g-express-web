const { Article } = require('../model');

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

// Create Article
exports.createArticles = async (req, res, next) => {
  try {
    const article = new Article({
      ...req.body.article,
      author: req.session.user._id
    })
    article.populate('author');
    await article.save();

    res.status(201).json({
      article
    });
  } catch (error) {
    next(error);
  }
}