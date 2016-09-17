'use strict';

const router = require('express').Router();
const passport = require('passport');
const User = require('../models').user;

router.get('/', checkAuth, (req, res) => {
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

router.get('/login', (req, res) => {
  res.render('admin/login', { messages: req.flash('error')});
});
router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  successFlash: 'Welcome back!',
  failureRedirect: '/admin/login',
  failureFlash: 'Incorrect username or password.'
}));

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.render('admin/logout');
});

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'Please log in to access that page.');
    res.redirect('/admin/login');
  }
}

module.exports = router;
