// Imports
var express = require('express');
var http = require('http');

var postsRouter = require('./posts/postsRouter');

// Initialisation
var app = express();
var server = http.createServer(app);
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.redirect('/posts');
});
	
app.use('/posts', postsRouter);


var port = Number(process.env.PORT || 3000);
server.listen(port, function () {
	console.log('DumDum now started on port %s', server.address().port);
});