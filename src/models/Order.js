const { DataTypes } = require('sequelize');
const { PriceType } = require('../dataType');

module.exports = (sequelize) => {
    sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'CustomerId'
        },
        orderDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'OrderDate'
        },
        deliveredDate: {
            type: DataTypes.DATEONLY,
            field: 'DeliveredDate'
        },
        isDelivered: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        totalAmount: {
            type: PriceType,
            field: 'TotalAmount'
        },
        status: {
            type: DataTypes.ENUM('Created', 'Processing', 'Canceled', 'Completed'), 
            allowNull: false,
            defaultValue: 'Created',
            field: 'Status'
        },
        payment_id:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        merchant_order_id: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
};
