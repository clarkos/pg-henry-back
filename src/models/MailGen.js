const { DataTypes } = require('sequelize');
const { ThemeType } = require('../dataType');

module.exports = (sequelize) => {
    sequelize.define('MailGen', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        theme: {
            type: ThemeType,
            allowNull: false,
            defaultValue: 'default',
            field: 'Theme'
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'ProductName'
        },
        productLink: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'ProductLink'
        },
        productCopyright: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'ProductCopyright'
        },
        greeting: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Greeting'
        },
        signature: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Signature'
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
};