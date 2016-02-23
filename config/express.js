'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const marked = require('marked');
const moment = require('moment');
const handlebars = require('handlebars');

module.exports = configExpress;

function configExpress(app) {
  // Add static dir of public files
  app.use(express.static('public'));

  // Configure locale for moment's date formatting
  moment.locale('en-us');

  // Add Handlebars as the view engine
  var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
      marked: function(string) {
        if (!string) { return '' };
        return new handlebars.SafeString(marked(string));
      },
      scriptDate: function(date) {
        if (!date) { let date = Date.now(); }
        return moment(date).format('MMM Do, YYYY')
      },
      roboDate: function(date) {
        if (!date) { let date = Date.now(); }
        return moment(date).format('YYYY-MM-DD HH:mm:ssZ');
      }
    },
    layoutsDir: 'views/hbs-layouts',
    partialsDir: 'views/hbs-partials'
  })

  app.engine('handlebars', hbs.engine);
  app.enable('view cache');
  app.set('view engine', 'handlebars');

}
