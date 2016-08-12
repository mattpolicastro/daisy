'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const hbscfg = require('./handlebars');

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
};
