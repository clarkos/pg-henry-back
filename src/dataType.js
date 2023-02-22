const { DataTypes } = require('sequelize');

const StatusType = DataTypes.ENUM('Active', 'Disabled');
const RoleType   = DataTypes.ENUM('User', 'Admin');
const PriceType  = DataTypes.DECIMAL(12, 2);
const ThemeType  = DataTypes.ENUM('default', 'neopolitan', 'salted', 'cerberus');

module.exports = { StatusType, RoleType, PriceType, ThemeType } ;
