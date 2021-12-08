'use strict';
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    isOk : DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Message.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          },
        })
        models.Message.hasMany(models.Commentaire, {
          foreignKey: {
            allowNull: true
          },
        })
      }
    }
  });
  return Message;
};