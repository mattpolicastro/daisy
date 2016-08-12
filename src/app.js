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

// Open database connection, handlers, and open the app
db.sequelize
  .sync({force: (process.env.NODE_ENV === 'development' || false)})
  .then(() => {
  // db.post.findAll().then((posts) => {
  //   console.log(posts);
  // });

    app.listen(port, function(err) {
      if (err) throw err;
      console.log('Now listening on port %s!', port);
    });
  }).catch(function(err){
    console.log(err);
  });
