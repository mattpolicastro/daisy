'use strict';
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    name: DataTypes.STRING
  },{
    hooks: {
      beforeCreate: (user, options, next) => {
        // Leaving this at the default of 10 rounds
        bcrypt.genSalt((err, salt) => {
          if (err) return next(err);
          user.salt = salt;
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next(null, user);
          });
        });
      }
    },
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Post);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        let hash = bcrypt.hashSync(password, this.salt);
        return (hash === this.password);
      }
    }
  });

  return User;
};
