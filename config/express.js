'use strict';

const express = require('express');

module.exports = configExpress;

function configExpress(app) {
  // Add static dir of public files
  app.use(express.static('public'));
}
