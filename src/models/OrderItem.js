const { DataTypes } = require('sequelize');
const { PriceType } = require('../dataType');

module.exports = (sequelize) => {
    sequelize.define('OrderItem', {
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
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'ProductId'
        },
        subProductId: {
            type: DataTypes.INTEGER,
            field: 'SubProductId'
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'Quantity',
            validate:{
                min: 1,
              }
        },
        unitPrice: {
            type: PriceType,
            allowNull: false,
            field: 'UnitPrice',            
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
