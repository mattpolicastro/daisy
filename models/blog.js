'use strict';

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  makeDate: Date,
  editDate: { type: Date, default: Date.now },
  postDate: Date,
  slug: { type: String, trim: true},
  summary: String,
  body: String
});

module.exports = blogSchema;
