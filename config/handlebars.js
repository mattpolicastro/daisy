'use strict';
const handlebars = require('handlebars');
const marked = require('marked');
const moment = require('moment');

// Configure locale for moment's date formatting
moment.locale('en-us');

module.exports = {
  // Set the default file extension
  extname: '.hbs',
  // Define the default layout
  defaultLayout: 'main',
  // Define global helpers
  helpers: {
    // Render markdown
    marked: function(string) {
      let markedString = string || '';
      return new handlebars.SafeString(marked(markedString));
    },
    // 'Nice' date formatting
    scriptDate: function(date) {
      let scriptDate = date || Date.now();
      return moment(scriptDate).format('MMM Do, YYYY');
    },
    // Longform date formatting for indexing
    roboDate: function(date) {
      let roboDate = date || Date.now();
      return moment(roboDate).format('YYYY-MM-DD HH:mm:ssZ');
    }
  },
  // Define the special dirs for layouts and partials
  layoutsDir: 'views/hbs-layouts',
  partialsDir: 'views/hbs-partials'
};
