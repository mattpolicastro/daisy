'use strict';

const router = require('express').Router();
const db = require(__dirname + '/../models');

router.get('/', (req, res) => {
  let offset = req.query.page * 10 || 0;
  db.post.findAll({
    attributes: ['slug', 'summary', 'postType', 'createdAt'],
    where: { status: 'published' },
    limit: 10,
    offset
  }).then((posts) => {
    res.render('posts', {posts, offset});
  });
});

router.get('/:slug', (req, res) => {
  db.post.findOne({
    where: { slug: req.params.slug }
  }).then((post) => {
    res.render('posts/post', {post});
  });
});

module.exports = router;
