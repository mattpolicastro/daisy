'use strict';

const router = require('express').Router();
const passport = require('passport');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('admin/login', { messages: req.flash('error')});
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
  res.render('admin/logout');
});

module.exports = router;
