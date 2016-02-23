'use strict';

const express = require('express');
const exphbs = require('express-handlebars');

module.exports = configExpress;

function configExpress(app) {
  // Add static dir of public files
  app.use(express.static('public'));

  // Add Handlebars as the view engine
  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.enable('view cache');
  app.set('view engine', 'handlebars');

}
