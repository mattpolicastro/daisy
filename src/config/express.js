'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const hbscfg = require('./handlebars.js');

module.exports = function(app) {
  // Add static dir of public files
  app.use(express.static('public'));

  // Add Handlebars as the view engine
  let hbs = exphbs.create(hbscfg);
  app.engine('.hbs', hbs.engine);
  app.set('view engine', '.hbs');
  // Enable view caching
  app.enable('view cache');
  // Livereload
  if (process.env.NODE_ENV === 'DEV') {
    app.use(require('connect-livereload')());
  }
};
