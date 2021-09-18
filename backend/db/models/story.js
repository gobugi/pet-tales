'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  Story.associate = function(models) {
    Story.belongsTo(models.User, { foreignKey: 'authorId' });
    Story.hasMany(models.Comment, { foreignKey: 'storyId' });
  };
  return Story;
};
