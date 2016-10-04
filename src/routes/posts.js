'use strict';

const router = require('express').Router();
const Post = require(__dirname + '/../models').Post.scope('posts');

router.get('/', (req, res) => {
  let offset = req.query.page * 10 || 0;
  Post.findAll({
    attributes: ['slug', 'summary', 'type', 'createdAt'],
    where: { status: 'published' },
    limit: 10,
    offset
  }).then((posts) => {
    res.render('posts', {posts, offset});
  });
});

router.get('/:slug', (req, res, next) => {
  Post.findOne({
    where: { slug: req.params.slug }
  }).then((post) => {
    if (post) {
      res.render('posts/post', { post });
    } else {
      next();
    }
  });
});

module.exports = router;
