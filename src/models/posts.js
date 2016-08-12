'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {
    published: DataTypes.DATE,
    description: DataTypes.STRING(160),
    type: DataTypes.ENUM('blog', 'tweet'),
    contents: DataTypes.JSONB
  });
}
