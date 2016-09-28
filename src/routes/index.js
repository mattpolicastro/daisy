'use strict';

const router = require('express').Router();
const passport = require('passport');
const User = require('../models').user;

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login', { messages: {
    error: req.flash('error'),
    success: req.flash('success')
  }});
});
router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  successFlash: 'Welcome back!',
  failureRedirect: '/login',
  failureFlash: 'Incorrect username or password.'
}));

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.render('logout', { user: null });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});
router.post('/signup', (req, res) => {
  User.findOrCreate({
    where: { username: req.body.username },
    defaults: {
      password: req.body.password,
      name: req.body.name
    }
  }).spread((user, created) => {
    if (created) {
      req.flash('success', `New user created: ${user.username}`);
      res.redirect('/login');
    } else if (!created && user) {
      req.flash('error', `Found existing user: ${user.username}`);
      res.redirect('/login');
    } else if (!created && !user) {
      res.status('500').send('error');
    }
  });
});

module.exports = router;
