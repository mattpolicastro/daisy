'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const Store = require('express-sequelize-session')(session.Store);

const db = require('../models');
const config = require('./');
const hbscfg = require('./handlebars');

const store = new Store(db.sequelize, 'sessions');

module.exports = (app) => {
  // Add static dir of public files
  app.use(express.static('src/public'));

  // Add Handlebars as the view engine
  let hbs = exphbs.create(hbscfg);
  app.engine('.hbs', hbs.engine);
  app.set('view engine', '.hbs');
  app.set('views', 'src/views');

  // Enable view caching
  app.enable('view cache');

  // Enable sessions
  app.use(session({
    saveUninitialized: false,
    secret: config.session.secret,
    secure: 'auto',
    store: store,
    resave: false
  }));

  app.use(flash());
  // Make the user and flash messages available to page templates
  app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.messages = {
      success: req.flash('success'),
      error: req.flash('error')
    };
    next();
  });
  app.use(bodyParser.urlencoded({ extended: true }));
};
