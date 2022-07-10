const { validationResult, buildCheckFunction } = require('express-validator');
const { isValidObjectId } = require('mongoose');
// can be reused by many routes

// parallel processing
exports = module.exports = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ error: errors.array() });
  };
};

exports.isValidObjectId = (location, fields) => {
  return buildCheckFunction(location)(fields).custom(async (value) => {
    //! 同步异步二选一即可 
    if (!isValidObjectId(value)) {
      // 异步
      return Promise.reject('ID 不是有效的 ObjectID');
      // 同步：失败
      // throw new Error('ID类型错误');
    }
    // 同步：成功
    // return true;
  });
}