const { DataTypes } = require('sequelize');

const StatusType = DataTypes.ENUM('Active', 'Disabled');
const RoleType   = DataTypes.ENUM('User', 'Admin');
const PriceType  = DataTypes.DECIMAL(12, 2);

module.exports = { StatusType, RoleType, PriceType } ;
