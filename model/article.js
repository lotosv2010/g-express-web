const mongoose = require('mongoose');
const baseModel = require('./base');

const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  ...baseModel,
  title: {
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tagList: {
    type: Array,
    default: null
  },
  slug: {
    type: String,
    default: null
  },
  favorited: {
    type: Boolean,
    default: false
  },
  favoritesCount: {
    type: Number,
    default: 0
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

module.exports = ArticleSchema;