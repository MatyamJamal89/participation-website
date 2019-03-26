'use strict';
module.exports = (sequelize, DataTypes) => {
  const Association = sequelize.define('Association', {
    name: DataTypes.STRING
  }, {});

  Association.associate = function(models) {
    models.Association.belongsToMany(models.Season, {
      through: 'Era'
    });

    models.Association.hasMany(models.User, {
      as: 'users',
    });
  };

  return Association;
};
