'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('association', 'management'),
      defaultValue: 'association'
    },
    last_login: DataTypes.DATE
  }, {});

  User.associate = function (models) {
    User.belongsTo(models.Association);
  };

  return User;
};
