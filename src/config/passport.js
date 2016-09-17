'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').user;

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({where: { username: username }}).then((user) => {
    if (!user) {
      console.log('incorrect username');
      return done(null, false, { message: 'incorrect username' });
    }
    if (!user.validPassword(password)) {
      console.log('incorrect password');
      return done(null, false, { message: 'incorrect password'});
    }
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    if (!user) return done(null, false);
    return done(null, user);
  });
});

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
