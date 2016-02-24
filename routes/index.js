'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const blogSchema = require('../models/blogSchema.js');

const Blog = mongoose.model('Blog', blogSchema);

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/create', function(req, res) {
  let blogPost = new Blog({title: Date.now()});
  blogPost.save(err => {
    if (!err) res.send('Saved!')
  });
})

router.get('/test', function(req, res) {
  let posts = Blog.find((err, blogs) => {
    res.send(String(blogs.join('\n')));
  });

})

module.exports = router;
