const { DataTypes } = require('sequelize');
const { StatusType } = require('../dataType');

module.exports = (sequelize) => {
    sequelize.define('Location', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'Name'
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Address'
        },
        coordinates: {
            type: DataTypes.STRING,
            field: 'Coordinates'
        },
        // Status: Active, Disabled
        status: {
            type: StatusType, 
            allowNull: false,
            defaultValue: 'Active',
            field: 'Status'
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
};
