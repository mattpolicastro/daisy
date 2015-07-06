var mongo = require('mongodb').MongoClient;
var express = require('express');
var RSS = require('rss');
var router = express.Router();
var marked = require('marked');

var template = require('./postTemplates');

var url = String(process.env.MONGO_URL || 'mongodb://localhost:27017/dumdum/');

router.use(express.static('public'));

mongo.connect(url, function(err, db) {

	var posts = db.collection('posts');
	var bios = db.collection('bios');

	router.get('/', function(req, res) {
		res.redirect('/posts');
	});

	router.get('/posts', function(req, res) {
		posts.find().sort({published: -1}).toArray(function(err, posts) {
			if(posts != null) {
				res.send(template.postsList({title: 'Posts', posts: posts}));
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

	router.get('/feed.xml', function(req, res) {
		var feed = new RSS({
			title: "Matt Policastro",
			description: "All posts from @mattpolicastro.",
			feed_url: "http://www.mattpolicastro.com/feed.xml",
			site_url: "http://www.mattpolicastro.com",
			language: "en",
			pubDate: new Date()
		});

		posts.find().sort({published: -1}).toArray(function(err, posts){
			posts.forEach(function(post){
				feed.item({
		 			title: post.title,
		 			description: marked(post.content),
		 			url: 'http://www.mattpolicastro.com/posts/' + post.slug,
		 			guid: post._id.toString(),
		 			date: post.published
				});
			});

			res.type('application/rss+xml');
			res.send(feed.xml({indent: true}));
		});
	});

	router.use(function(req, res){
		res.send(template.fourOhFour());
	});

});

module.exports = router;
