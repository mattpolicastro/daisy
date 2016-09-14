# Daisy

A blog that posts to and reads from other places. Built on Node.js/Express and PostgreSQL.

## In Progress

* Database models
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
* Add [Ansible plays](https://derpops.bike/2014/06/07/ssh-key-rotation-with-ansible/) for inserting client/host ssh keys for db access
* Add Ansible plays for Nginx and Varnish configuration
