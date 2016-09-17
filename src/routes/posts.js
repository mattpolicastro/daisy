'use strict';

const router = require('express').Router();
const Post = require(__dirname + '/../models').post;

router.get('/', (req, res) => {
  let offset = req.query.page * 10 || 0;
  Post.findAll({
    attributes: ['slug', 'summary', 'postType', 'createdAt'],
    where: { status: 'published' },
    limit: 10,
    offset
  }).then((posts) => {
    res.render('posts', {posts, offset});
  });
});

router.get('/:slug', (req, res) => {
  Post.findOne({
    where: { slug: req.params.slug }
  }).then((post) => {
    res.render('posts/post', {post});
  });
});

module.exports = router;
