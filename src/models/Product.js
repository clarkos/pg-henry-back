const { DataTypes } = require('sequelize');

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
            type: DataTypes.STRING,
            field: 'Description'
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'StartDate'
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'EndDate'
        },
        startTime: {
            type: DataTypes.STRING,
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
        // Status: Active, Disabled
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Active',
            field: 'Status'
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
};
