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
        shippingDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'ShippingDate'
        },
        totalAmount: {
            type: PriceType,
            field: 'TotalAmount'
        },
        status: {
            type: DataTypes.ENUM('Pending', 'Canceled', 'Completed'), 
            allowNull: false,
            defaultValue: 'Pending',
            field: 'Status'
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
};
