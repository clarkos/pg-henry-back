const { DataTypes } = require('sequelize');
const { PriceType } = require('../dataType');

module.exports = (sequelize) => {
    sequelize.define('Payment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'OrderId'
        },
        type: {
            type: DataTypes.ENUM('MercadoPago'), 
            allowNull: false,
            defaultValue: 'MercadoPago',
            field: 'Type'
        },
        totalAmount: {
            type: PriceType,
            allowNull: false,
            field: 'TotalAmount',            
        },
    }, {
        timestamps: false,
        freezeTableName: true
    });
};
