const { Article } = require('../model');

exports.showHome = async (req, res, next) => {
  try {
    const { tag, favorited, pageSize = 5, page = 1} = req.query;
    const filter = {};
    if(tag) {
      filter.tagList = tag
    }
    if(req?.session?.user) {
      filter.author = req?.session?.user?._id;
    }
    const articles = await Article.find(filter)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({
        createAt: -1
      })
      .populate('author');
    const articleCount = await Article.countDocuments(filter);
    res.render('index', {
      articles,
      articleCount,
      page,
      pageSize,
      totalPage: Math.ceil(articleCount / pageSize)
    });
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