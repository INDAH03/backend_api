const { DataTypes } = require('sequelize')
const db = require('../config/database');

const User = db.define('User', {
    name: DataTypes.STRING,
    email: {type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
});

module.exports = User;