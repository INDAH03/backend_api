const { DataTypes } = require('sequelize');
const db = require('../config/database');
const User = require('./user.model');

const Post = db.define('Post', {
  content: DataTypes.TEXT,
});

Post.belongsTo(User, { foreignKey: 'authorId' });
User.hasMany(Post, { foreignKey: 'authorId' });

module.exports = Post;
