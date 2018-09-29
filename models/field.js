'use strict';
module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define('Field', {
    FormId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    required: DataTypes.BOOLEAN,
    sorting: DataTypes.STRING,
    options: DataTypes.JSON
  }, {});
  Field.associate = function(models) {
    models.Field.belongsTo(models.Form);
  };
  return Field;
};