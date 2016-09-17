'use strict';
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  },{
    hooks: {
      beforeCreate: (user, options, done) => {
        bcrypt.hash(user.password, saltRounds, (err, hash) => {
          if (err) return done(err);
          user.password = hash;
          done(null, user);
        });
      }
    },
    instanceMethods: {
      validPassword: (password) => {
        console.log(`incoming password: ${password}`);
        console.log(`existing password: ${this.password}`);
        return (password === this.password);
      }
    }
  });
};
