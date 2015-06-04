var fs = require('fs');
var handlebars = require('handlebars');
var layouts = require('handlebars-layouts');

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('layout', fs.readFileSync(__dirname + '/layout.hbs', 'utf8'));

function loadTemplate(name) {
	return fs.readFileSync(__dirname + '/views/' + name, 'utf8');
};

module.exports = {
	postsList: handlebars.compile(
		loadTemplate('postsList.hbs')
	),
	postPage: handlebars.compile(
		loadTemplate('postPage.hbs')
	)
};