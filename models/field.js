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
    models.Field.belongsTo(models.Form, {constraints:false}); // allows us to cascade on delete
  },
  // Find next number in sort order
  Field.beforeCreate( async (field, options) => {
    const sortlist = await Field.findAll({ 
      where: {FormId: field.FormId}, 
      raw: true 
    });
    if (sortlist.length) {
      let count = [];
      sortlist.forEach( (sort) =>  {
          count.push(sort.sorting);
      });
      var max = Math.max(...count) + 1;
      field.sorting = max;
    } else {
        // first item in the list of fields
        field.sorting = 0;
    }
  });
  return Field;
};

