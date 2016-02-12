// Imports
var express = require('express');
var http = require('http');

var router = require('./posts/postsRouter');

// Initialisation
var app = express();
var server = http.createServer(app);

app.use(express.static('public'));	
app.use('/', router);

var port = Number(process.env.PORT || 3000);
server.listen(port, function () {
	console.log('DumDum now started on port %s', server.address().port);
});