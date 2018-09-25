const Sequelize = require('sequelize');
const sequelize = require('../common/database').sequelize;

const User = sequelize.define('users', {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.NUMERIC,
      defaultValue:0

    }
  });


  function createUser(username, password) {
    // force: true will drop the table if it already exists
    User.sync({force: true}).then(() => {
        // Table created
        return User.create({
            'username': username,
            'password': password
        });
    });
  }

  module.exports = {
    User,
    createUser
  }