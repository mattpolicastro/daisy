'use strict';

module.exports = function(sequelize, DataTypes) {
  let Post = sequelize.define('post', {
    status: DataTypes.ENUM('draft', 'published'),
    slug: DataTypes.STRING,
    summary: DataTypes.STRING,
    postType: DataTypes.ENUM('blog', 'tweet'),
    contents: DataTypes.JSONB
  });

  return Post;
};
