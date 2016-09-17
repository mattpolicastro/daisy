'use strict';

const router = require('express').Router();
const passport = require('passport');
const User = require('../models').user;

router.get('/', (req, res) => {
  res.render('admin', { messages: req.flash('success')});
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

router.get('/login', (req, res) => {
  res.render('admin/login', { messages: req.flash('error')});
});
router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  successFlash: 'Welcome back!',
  failureRedirect: '/admin/login',
  failureFlash: 'Incorrect username or password.'
}));

module.exports = router;
