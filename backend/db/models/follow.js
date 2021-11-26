'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Follow.associate = function(models) {
    Follow.belongsTo(models.User, { foreignKey: 'userId' });
    Follow.belongsTo(models.User, { foreignKey: 'followerId' });
  };
  return Follow;
};
