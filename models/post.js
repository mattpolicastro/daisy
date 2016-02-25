'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  published: Date,
  preview: String,
  type: String,
});
const Post = new mongoose.model('Post', postSchema);

const tweetSchema = new mongoose.Schema({
  tweetUrl: {type: String, trim: true},
  length: Number
});

const blogSchema = new mongoose.Schema({
  slug: { type: String, trim: true },
  content: String,
  /* Thinking about how to version posts over time; should all fields fall into
   * an array of full posts, or should some things (like the post slug) stay
   * constant?
   * OR
   * Keep the current version's info as top-level field; on changes, create a
   * new document in an "Archive" collection with the now-outdated fields and
   * insert the new doc's ObjectId into the versions array
   */
  versions: [{ type: Schema.Types.ObjectId, ref: 'BlogVersions'}]
});

module.exports = {
  Post: new mongoose.model('Post', postSchema),
  Blog: Post.discriminator('Blog', blogSchema),
  Tweet: Post.discriminator('Tweet', tweetSchema)
};
