var fs = require('fs');
var handlebars = require('handlebars');
var layouts = require('handlebars-layouts');
var marked = require('marked');
var moment = require('moment');

moment.locale('en-us');

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('layout', fs.readFileSync(__dirname + '/layout.hbs', 'utf8'));
handlebars.registerPartial('header', fs.readFileSync(__dirname + '/header.hbs', 'utf8'));

handlebars.registerHelper('marked', function(string) {
	if(!string) return '';
	var safeString = marked(string);
	return new handlebars.SafeString(safeString);
});

handlebars.registerHelper('listDate',function(date) {
	if(!date) return '';
	//var niceDate = date.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
	var momentDate = moment(date);
	return momentDate.format('MMM D, YYYY');
});

handlebars.registerHelper('scriptDate',function(date) {
	if(!date) return '';
	//var niceDate = date.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
	var momentDate = moment(date);
	return momentDate.format('MMMM Do, YYYY');
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