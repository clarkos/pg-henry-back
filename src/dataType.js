const { DataTypes } = require('sequelize');

const StatusType = DataTypes.ENUM('Active', 'Disabled');
const RoleType = DataTypes.ENUM('User', 'Admin');

module.exports = { StatusType, RoleType } ;
