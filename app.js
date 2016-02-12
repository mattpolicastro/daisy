// Node modules
var express = require('express');
var mongoose = require('mongoose');

// Global constants
import * as config from "config";

// Open database connection
var mongoUrl =
mongoose.connect(
	(config.MONGO_URL || 'mongodb://localhost:27017/daisy'),
	function(err) {
		if err throw err;
	}
);

// Handle errors and initialise app
var db = mongoose.connection;
db.on('error', function(err) {
	// This is a bad way to handle errors; need to fix
	if err throw err;
});
db.once('open', function() {
	// Initalise Express app
	var app = express();

	// Add static dir of public files
	app.use(express.static('public'));

	// Load handlers/routers
	var = require('routes/index')
	var = require('routes/posts');

	// Mount handlers/routers
	app.use('/', index);
	app.use('/posts', posts);

	// Default to localhost:3000
	const PORT = config.PORT || 3000;
	app.listen(PORT, function(err) {
		if err throw err;
		console.log('Now listening on port %s', PORT);
	});

});
