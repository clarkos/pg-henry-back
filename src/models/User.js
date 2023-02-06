const { DataTypes } = require("sequelize");
const { StatusType } = require("../dataType");

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
        field: "Name",
      },
      //   password: {
      //     type: DataTypes.STRING,
      //     set(value) {
      //       this.setDataValue('password', hash(value));
      //     }
      //   },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
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
