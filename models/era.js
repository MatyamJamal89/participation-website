module.exports = (sequelize, DataTypes) => {
  const Era = sequelize.define('Era', {});

  Era.associate = function (models) {
    models.Association.belongsToMany(models.Season, {
      through: models.Era
    });

    models.Season.belongsToMany(models.Association, {
      through: models.Era
    });
  };

  sequelize.sync();

  return Era;
};
