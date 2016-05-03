# Daisy

A blog that posts to and reads from other places. Built on Node.js/Express and PostgreSQL.

## In Progress

Daisy is still pretty much non-functional, but things in progress:

* Set up DB models and access
	* Current plan is to have one table (Posts) with a set of common fields (e.g. summary, title, link), with links out to variety-specific tables
	* Or, give up on reason and use embedded JSON
* Finish Gruntile for local testing/builds

## To Do

* Auth/admin for post creation and admin
* Add Twitter cross-posting
* Add Tumblr cross-posting
