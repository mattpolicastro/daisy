'use strict';

const router = require('express').Router();
const passport = require('passport');
const User = require('../models').User;

router.get('/', function(req, res) {
  res.render('index', { title: 'Hi.' });
});

router.get('/login', (req, res) => {
  if (req.user) {
    req.flash('success', 'You\'re already logged in!');
    res.redirect('admin');
  } else {
    res.render('login', {
      title: 'Log In'
    });
  }
});
router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  successFlash: 'Welcome back!',
  failureRedirect: '/login',
  failureFlash: 'Incorrect username or password.'
}));

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'See you, space cowboy.');
  res.redirect('/login');
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up' });
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
