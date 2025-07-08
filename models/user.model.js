module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

User.associate = (models) => {
  User.hasMany(models.Post, { foreignKey: 'authorId' });
  User.hasMany(models.Like, { foreignKey: 'userId', onDelete: 'CASCADE' });
  User.hasMany(models.Bookmark, { foreignKey: 'userId' });
};


  return User;
};
