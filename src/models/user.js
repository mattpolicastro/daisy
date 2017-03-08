'use strict';
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    name: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    hooks: {
      beforeValidate: function(user, opts, next) {
        if (typeof user.get('salt') === 'undefined') {
          bcrypt.genSalt((err, salt) => {
            if (err) return next(err);
            user.set('salt', salt);
            next(null, opts);
          });
        }
      },
      beforeCreate: function(user, options, next) {
        console.log(user);
        bcrypt.hash(user.get('password'), user.get('salt'), (err, hash) => {
          if (err) return next(err);
          user.set('password', hash);
          next(null, user);
        });
      }
    },
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Post);
      }
    },
    instanceMethods: {
      passwordHash: function(password) {
        let hash = bcrypt.hashSync(password, this.salt);

        return hash;
      },
      passwordCheck: function(password) {
        let hash = bcrypt.hashSync(password, this.salt);
        return (hash === this.password);
      }
    }
  });

  return User;
};
