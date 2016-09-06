# Daisy

A blog that posts to and reads from other places. Built on Node.js/Express and PostgreSQL.

## In Progress

Daisy can display content in a pretty minimal fashion, but things in progress:

* Figure out database models
	* Currently, one table ("Posts") with enumerated types, common fields for post lists, and JSON to handle the body/content
	* A general collection of custom/one-off pages (e.g. a bio page)?
* Polish Vagrant/Ansible configs for testing/deployment
* Build out templates for homepage and new posts list
* General styles and typography

## To Do

* Auth/admin for post creation and admin
* Add Twitter integration
* Add Tumblr integration
* Add Snippets integration (eventually)
* Fix RSS integration after new post formats have settled
