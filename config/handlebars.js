'use strict';

const moment = require('moment');
const handlebars = require('handlebars');

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
      if (!string) { return '' };
      return new handlebars.SafeString(marked(string));
    },
    // 'Nice' date formatting
    scriptDate: function(date) {
      if (!date) { let date = Date.now(); }
      return moment(date).format('MMM Do, YYYY')
    },
    // Longform date formatting for indexing
    roboDate: function(date) {
      if (!date) { let date = Date.now(); }
      return moment(date).format('YYYY-MM-DD HH:mm:ssZ');
    }
  },
  // Define the special dirs for layouts and partials
  layoutsDir: 'views/hbs-layouts',
  partialsDir: 'views/hbs-partials'
}
