var fs = require('fs');
var handlebars = require('handlebars');
var layouts = require('handlebars-layouts');
var marked = require('marked');
var moment = require('moment');

moment.locale('en-us');

handlebars.registerHelper('listDate', function(date) {
	if(!date) return '';
	var momentDate = moment(date);
	return momentDate.format('MMM D, YYYY');
});

handlebars.registerHelper('scriptDate', function(date) {
	if(!date) return '';
	var momentDate = moment(date);
	return momentDate.format('MMMM Do, YYYY');
});

handlebars.registerHelper('roboDate', function(date) {
	if(!date) return '';
	var momentDate = moment(date);
	return momentDate.format('YYYY-MM-DD HH:mm:ssZ');
});

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
