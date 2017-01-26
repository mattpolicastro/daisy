'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').User;

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({where: { username: username }}).then((user) => {
    if (!user) {
      console.log('incorrect username');
      return next(null, false, { message: 'incorrect username' });
    }
    if (!user.passwordCheck(password)) {
      console.log('incorrect password');
      return next(null, false, { message: 'incorrect password'});
    }
    return next(null, user);
  });
}));

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findById(id).then((user) => {
    if (!user) return next(null, false);
    return next(null, user);
  });
});

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });
};
