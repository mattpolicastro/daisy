'use strict';

const router = require('express').Router();

router.get('/', function(req, res) {
  res.render('posts/index');
});

module.exports = router;
