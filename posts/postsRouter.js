var mongo = require('mongodb').MongoClient;
var express = require('express');
var router = express.Router();

var template = require('./postTemplates');

var url = String(process.env.MONGO_URL || 'mongodb://localhost:27017/dumdum/');

mongo.connect(url, function(err, db) {
	
	var posts = db.collection('posts');
	
	router.get('/', function(req, res) {
		posts.find().toArray(function(err, posts) {
			if(err) res.sendStatus(404);
			console.dir(posts);
			res.send(template.postsList({posts: posts}));
		});
	});
	
	router.get('/:slug', function(req, res) {
		posts.findOne({slug: req.params.slug}, {limit: 1}, function(err, post) {
			if(err) res.sendStatus(404);
			console.dir(post);
			res.send(template.postPage(post));
		});
	});
	
});

module.exports = router;