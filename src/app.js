/* ~Daisy~
 * Borrows liberally from https://github.com/madhums/node-express-mongoose-demo/
 */
'use strict';

const express = require('express');
const db = require(__dirname + '/models');
const config = require(__dirname + '/config');

// Defaults/initialise the app
const port = config.PORT || 3000;
const app = express();


// Configure the app
require('./config/express')(app);
require('./config/routes')(app);
require('./config/passport')(app);

// Open database connection, handlers, and open the app
db.sequelize.sync().then(() => {
  app.listen(port, function(err) {
    if (err) throw err;
    console.log('Now listening on port %s!', port);
  });
}).catch(function(err){
  console.log(err);
});
