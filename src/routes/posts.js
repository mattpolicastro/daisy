'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const blogSchema = require('../models/blogSchema.js');

const Blog = mongoose.model('Blog', blogSchema);

router.get('/', function(req, res) {
  Blog.find().sort('-editDate').exec((err, posts) => {
    if (err) res.status(500).send(new Error(err));
    res.render('posts/index', {title: 'Posts', posts: posts});
  });
});

router.get('/:slug', function(req, res) {
  Blog.findOne({slug: req.params.slug}, {limit: 1}, function(err, post) {
    if (err) res.status(500).send(new Error(err));
    res.render('posts/postPage');
  });
});

module.exports = router;
