var fs = require('fs');
var handlebars = require('handlebars');
var layouts = require('handlebars-layouts');
var marked = require('marked');
var moment = require('moment');

function loadTemplate(name) {
	return fs.readFileSync(__dirname + '/views/' + name, 'utf8');
};

module.exports = {
	postsList: handlebars.compile(
		loadTemplate('postsList.hbs')
	),
	postPage: handlebars.compile(
		loadTemplate('postPage.hbs')
	),
	fourOhFour: handlebars.compile(
		loadTemplate('404.hbs')
	)
};
