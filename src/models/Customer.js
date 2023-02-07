const { DataTypes } = require("sequelize");
const { StatusType } = require("../dataType");

module.exports = (sequelize) => {
  sequelize.define(
    "Customer",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "Id",
      },
      // userId: {
      //   type: DataTypes.INTEGER,
      //   field: "UserId",
      // },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "Name",
      },
      address: {
        type: DataTypes.STRING,
        field: "Address",
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "City",
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "State",
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "Zip",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "Email",
      },
      telephone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        field: "Telephone",
      },
      document: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        field: "Document",
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'BirthDate'
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
