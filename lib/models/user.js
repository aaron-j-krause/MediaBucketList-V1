'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('user', {
      username: {
        type: DataTypes.STRING
      },
      displayName: {
        type: DataTypes.STRING
      }
    },
    {
      classMethods: {
        associate: function (models) {
          User.hasMany(models.bucket_list);
        }
      }
    });

  return User;
};