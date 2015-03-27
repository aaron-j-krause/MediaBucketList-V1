'use strict';

module.exports = function (sequelize, DataTypes) {
  var BucketList = sequelize.define('bucket_list', {
      listType: {
        type: DataTypes.STRING
      },
      subjectId: {
        type: DataTypes.STRING
      },
      subjectName: {
        type: DataTypes.STRING
      },
      subjectInfo: {
        type: DataTypes.JSON
      }
    },
    {
      classMethods: {
        associate: function (models) {
          BucketList.belongsTo(models.user);
        }
      }
    });

  return BucketList;
};