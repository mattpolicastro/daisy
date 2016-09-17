'use strict';

const router = require('express').Router();
const User = require('../models').user;

router.get('/', (req, res) => {
  res.render('admin', {
    messages: req.flash('success'),
    authStatus: req.isAuthenticated()
  });
});

module.exports = router;
