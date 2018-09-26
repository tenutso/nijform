const Sequelize = require('sequelize');
const sequelize = require('../common/database').sequelize;

const Form = sequelize.define('forms', {
    title: {
      type: Sequelize.STRING
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      defaultValue:1
    }
  });

  module.exports = { Form }