'use strict';
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  },{
    hooks: {
      beforeCreate: (user, options, done) => {
        // Leaving this at the default of 10 rounds
        bcrypt.genSalt((err, salt) => {
          if (err) return done(err);
          user.salt = salt;
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return done(err);
            user.password = hash;
            done(null, user);
          });
        });
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        let hash = bcrypt.hashSync(password, this.salt);
        return (hash === this.password);
      }
    }
  });
};
