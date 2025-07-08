module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

Post.associate = function(models) {
  Post.belongsTo(models.User, { foreignKey: 'authorId' });
  Post.hasMany(models.Like, { foreignKey: 'postId', onDelete: 'CASCADE' });
  Post.hasMany(models.Bookmark, { foreignKey: 'postId' });
};

  return Post;
};
