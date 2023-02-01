const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Artist', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        groupId: {
            type: DataTypes.INTEGER,
            field: 'GroupId'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Name'
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
