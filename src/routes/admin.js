'use strict';

const router = require('express').Router();
const User = require('../models').user;

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});
router.post('/signup', (req, res) => {
  console.log(req.body);
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      console.log(req.body);
      User.create({
        username: req.body.username,
        password: req.body.password
      }).then(() => {
        res.send('user created');
      });
    } else {
      console.log(`user found: ${user.username}, ${user.password}`);
      res.send(`user found: ${user.username}, ${user.password}`);
    }
  });
});

module.exports = router;
