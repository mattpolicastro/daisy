'use strict';

const router = require('express').Router();
const User = require('../models').user;

router.get('/', (req, res) => {
  res.render('admin', {
    messages: req.flash('success'),
    authStatus: req.isAuthenticated()
  });
});

router.get('/signup', (req, res) => {
  res.render('admin/signup');
});
router.post('/signup', (req, res) => {
  User.findOrCreate({
    where: { username: req.body.username },
    defaults: { password: req.body.password }
  }).spread((user, created) => {
    if (created) res.send(`new user created: ${user}`);
    if (!created && user) {
      res.send(`found existing: ${user}`);
    }
    if (!created && !user) {
      res.send('error');
    }
  });
});

module.exports = router;
