const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Photo', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'ProductId'
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Path'
        },
    }, {
        timestamps: false,
        freezeTableName: true
    });
};
