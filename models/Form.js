'use strict';
module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define('Form', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN
  }, {});
  Form.associate = function(models) {
    models.Form.hasMany(models.Field, {onDelete: 'cascade', hooks:true});
  };
  return Form;
};