var mongo = require('mongodb').MongoClient;
var express = require('express');
var router = express.Router();

var template = require('./postTemplates');

var url = String(process.env.MONGO_URL || 'mongodb://localhost:27017/dumdum/');

mongo.connect(url, function(err, db) {
	
	var posts = db.collection('posts');
	var bios = db.collection('bios');
	
	router.get('/', function(req, res) {
		res.redirect('/posts');
	});
	
	router.get('/posts', function(req, res) {
		posts.find().sort({published: -1}).toArray(function(err, posts) {
			if(post != null) {
				res.send(template.postsList({posts: posts}));
			} else {
				res.send(template.fourOhFour());
			}
		});
	});
	
	router.get('/posts/:slug', function(req, res) {
		posts.findOne({slug: req.params.slug}, {limit: 1}, function(err, post) {
			if(post != null) {
				res.send(template.postPage(post));
			} else {
				res.send(template.fourOhFour());
			}
		});
	});
	
	router.get('/about', function(req, res) {
		bios.findOne({}, function(err, bio) {
			if(err) res.sendStatus(404);
			res.send(template.postPage(bio));
		});
	});
	
});

module.exports = router;