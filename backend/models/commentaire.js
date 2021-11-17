'use strict';
module.exports = (sequelize, DataTypes) => {
  var Commentaire = sequelize.define('Commentaire', {
    Commentaire: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Commentaire.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          },
        })
        models.Commentaire.belongsTo(models.Message, {
          foreignKey: {
            allowNull: false
          },
        })
      }
    }
  });
  return Commentaire;
};