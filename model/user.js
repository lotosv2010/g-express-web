const mongoose = require('mongoose');
const baseModel = require('./base');
const md5 = require('../util/md5');

// todo：2 Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  ...baseModel,
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false, // 查询的时候过滤这个字段
    set: value => md5(value)
  },
  bio: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  },
});

module.exports = UserSchema;