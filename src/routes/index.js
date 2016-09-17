'use strict';

const router = require('express').Router();
const passport = require('passport');
const User = require('../models').user;

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login', { messages: req.flash('error')});
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
  res.render('logout');
});

router.get('/signup', (req, res) => {
  res.render('signup');
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
