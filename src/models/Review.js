const { DataTypes } = require('sequelize');
const { StatusType } = require('../dataType');

module.exports = (sequelize) => {
    sequelize.define('Review', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        productId: {
            type: DataTypes.INTEGER,
            field: 'ProductId'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'UserId'
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Message'
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 5 },
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
