'use strict';

const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').user;

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }).then((user) => {
    if (!user) {
      return done(null, false, { message: 'incorrect username' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'incorrect password'});
    }
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ id: id }).then((err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    return done(null, user);
  });
});

module.exports = (app) => {
  // app.use(cookieParser);
  app.use(passport.initialize());
  app.use(passport.session());
};
