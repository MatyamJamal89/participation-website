'use strict';
module.exports = (sequelize, DataTypes) => {
  const Season = sequelize.define('Season', {
    name: DataTypes.STRING
  }, {});

  Season.associate = function (models) {
    models.Season.belongsToMany(models.Association, {
      through: 'Era'
    });
  }

  return Season;
};
