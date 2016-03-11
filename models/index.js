/* Borrows heavily from the sequelize sample express app:
 * https://github.com/sequelize/express-example/blob/59b589b9c80a7c748433fd8161fb61d75828da9f/models/index.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('Sequelize');

const config = require('../config/config');
const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.options
);
var db = {};

console.log(__dirname)

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
