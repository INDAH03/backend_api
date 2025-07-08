module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  return Comment;
};
