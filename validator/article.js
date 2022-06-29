const { body, param } = require('express-validator');
const validate = require('../middleware/validate');
const { Article } = require('../model');

exports.createArticle = validate([
  body('article.title').notEmpty().withMessage('标题不能为空'),
  body('article.description').notEmpty().withMessage('描述不能为空'),
  body('article.body').notEmpty().withMessage('内容不能为空')
]);

exports.getArticle = validate([
  // param('slug').custom(async (value) => {
  //   if(!mongoose.isValidObjectId(value)) {
  //     return Promise.reject('文章ID类型错误');
  //   }
  // })
  validate.isValidObjectId(['params'], 'slug')
]);

exports.updateArticle = [
  // 校验 id 是否合法
  validate([
    validate.isValidObjectId(['params'], 'slug')
  ]),
  // 校验文章是否存在
  async (req, res, next) => {
    const slug = req.params.slug;
    const article = await Article.findById(slug);
    req.article = article;
    if(!article) {
      return res.status(404).end();
    }
    next();
  },
  // 校验文章作者是否当前登录由户
  async (req, res, next) => {
    if(req.user?._id?.toString() !== req.article?.author?.toString()) {
      return res.status(403).end();
    }
    next();
  },
];

exports.deleteArticle = exports.updateArticle;