/* eslint-disable camelcase */
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      service_provider: DataTypes.BOOLEAN,
      pet_owner: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      about_me: DataTypes.TEXT,
      location: DataTypes.STRING,
      createdAt: {
        field: 'created',
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: 'modified',
        type: DataTypes.DATE,
      }
    });
    return User;
  };
  