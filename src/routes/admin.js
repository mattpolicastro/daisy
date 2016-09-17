'use strict';

const router = require('express').Router();
const passport = require('passport');
const User = require('../models').user;

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});
router.post('/signup', (req, res, done) => {
  console.log(req.body);
  User.findOrCreate({
    where: { username: req.body.username, password: req.body.password }
  }).spread((user, created) => {
    if (created) console.log(`Created new user: ${user.username}`);
    if (user) {
      console.log(`Existing user: ${user.username}`);
      passport.authenticate('local', {
        failureRedirect: '/admin/signup',
        successRedirect: '/posts'
      })(req, res, done);
    }
  });
});

module.exports = router;
