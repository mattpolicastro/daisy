'use strict';

module.exports = function(sequelize, DataTypes) {
  let Post = sequelize.define('Post', {
    status: DataTypes.ENUM('draft', 'published'),
    slug: DataTypes.STRING,
    summary: DataTypes.STRING,
    type: DataTypes.ENUM('about', 'blog', 'tweet'),
    contents: DataTypes.JSONB
  },{
    scopes: {
      posts: {
        where: { type: { $not: 'about' } }
      },
      abouts: {
        where: { type: 'about' }
      }
    },
    classMethods: {
      associate: function(models) {
        Post.belongsTo(models.User, {
          foreignKey: { allowNull: false }
        });
      }
    }
  });

  return Post;
};
