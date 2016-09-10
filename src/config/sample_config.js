'use strict';
/* Export different application settings based on environment variables */
const production = {
  db: {
    database: 'daisy',
    host: 'db.server.net',
    dialect: 'postgres'
  }
};
const development = {
  db: {
    database: 'daisy',
    host: 'localhost',
    dialect: 'postgres'
  }
};
module.exports = process.env.prod ? production : development;
