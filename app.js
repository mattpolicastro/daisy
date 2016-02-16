'use strict';
/*
 * ~Daisy~
 * Borrows liberally from https://github.com/madhums/node-express-mongoose-demo/
 */

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');

// Defaults/initialise the app
const url = config.MONGO_URL || 'mongodb://db.vagrant.dev:27017/daisy';
const port = config.PORT || 3000;
const app = express();

// Configure the app
require('./config/express')(app);
require('./config/routes')(app);

// Open database connection, handlers, and open the app
connect()
	.on('error', console.log)
	.on('disconnected', connect)
	.once('open', listen);

function connect() {
	return mongoose.connect(url).connection;
}

function listen() {
	app.listen(port, function(err) {
		if (err) throw err;
		console.log('Now listening on port', port);
	});
}
