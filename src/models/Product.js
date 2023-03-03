const { DataTypes } = require('sequelize');
const { StatusType } = require('../dataType');

module.exports = (sequelize) => {
    sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        locationId: {
            type: DataTypes.INTEGER,
            field: 'LocationId'
        },
        artistId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'ArtistId'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'Name'
        },
        description: {
            type: DataTypes.STRING(500),
            field: 'Description'
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'StartDate'
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
            field: 'StartTime'
        },
        stock: {
            type: DataTypes.INTEGER,
            field: 'Stock'
        },
        price: {
            type: DataTypes.DECIMAL(12, 2),
            field: 'Price'
        },
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
