'use strict';

const router = require('express').Router();
const passport = require('passport');
const User = require('../models').user;

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});
router.post('/signup', (req, res) => {
  console.log(req.body);
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
  res.render('auth/login');
});
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/admin/login'
}));

module.exports = router;
