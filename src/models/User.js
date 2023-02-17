const { DataTypes } = require("sequelize");
const { StatusType, RoleType } = require("../dataType");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "Id",
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "UserName",
      },
      // password: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      role: {
        type: RoleType,
        allowNull: false,
        defaultValue: "User",
        field: "Role",
      },
      status: {
        type: StatusType,
        allowNull: false,
        defaultValue: "Active",
        field: "Status",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
