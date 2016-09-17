# Daisy

A blog that posts to and reads from other places. Built on Node.js/Express and PostgreSQL.

## In Progress

* Implement session store
	* Fix race conditions where flash messages get bumped/dropped
	* Make sure it piggy-backs the existing DB connection
* Database models
	* Currently, one table ("Posts") with enumerated types, common fields for post lists, and JSON to handle the body/content
	* A general collection of custom/one-off pages (e.g. a bio page)?

## To Do

* Figure out better way to include Bourbon/Sass dependencies so they aren't drowning the repository
* Build out templates for homepage and new posts list
* General styles and typography
* General dev:
	* CMS/admin area for post creation
	* Add functional tests ([CasperJS?](https://www.helpscout.net/blog/functional-testing-casperjs/))
	* Fix RSS feed (after new post formats have settled)
* Integrations:
	* Twitter
	* Tumblr
	* Snippets.today
* Deployment:
	* Add [Ansible plays](https://derpops.bike/2014/06/07/ssh-key-rotation-with-ansible/) for inserting client/host ssh keys for db access
	* Add Ansible plays for Nginx and Varnish configuration
