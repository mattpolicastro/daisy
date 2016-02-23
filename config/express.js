'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const marked = require('marked');
const handlebars = require('handlebars');

module.exports = configExpress;

function configExpress(app) {
  // Add static dir of public files
  app.use(express.static('public'));

  // Add Handlebars as the view engine
  var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
      marked: function(string) {
        if(!string) return '';
        return new handlebars.SafeString(marked(string));
      }
    }
  })

  app.engine('handlebars', hbs.engine);
  app.enable('view cache');
  app.set('view engine', 'handlebars');

}
