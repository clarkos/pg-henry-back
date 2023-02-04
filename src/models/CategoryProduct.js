const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('CategoryProduct', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        categoryId: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            field: 'CategoryId'
        },
        productId: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            field: 'ProductId'
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
};
