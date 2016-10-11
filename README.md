# Daisy

A blog that posts to and reads from other places. Built on Node.js/Express and PostgreSQL.

## In Progress

* Handling for site/user settings and admin operations

## Bugs

* /signup sometimes creates two user entries

## To Do

* Figure out better way to include Bourbon/Sass dependencies so they aren't drowning the repository
* Build out templates for homepage and new posts list
* General styles and typography
* General dev:
	* Add functional tests ([CasperJS?](https://www.helpscout.net/blog/functional-testing-casperjs/))
	* Fix RSS feed (after new post formats have settled)
* Integrations:
	* Twitter
	* Tumblr
	* Snippets.today
* Deployment:
	* Add [Ansible plays](https://derpops.bike/2014/06/07/ssh-key-rotation-with-ansible/) for inserting client/host ssh keys for db access
	* Add Ansible plays for Nginx and Varnish configuration
