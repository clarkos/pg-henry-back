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
      userId: {
        type: DataTypes.INTEGER,
        field: "UserId",
      },
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
        field: "City",
      },
      state: {
        type: DataTypes.STRING,
        field: "State",
      },
      zip: {
        type: DataTypes.STRING,
        field: "Zip",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "Email",
      },
      telephone: {
        type: DataTypes.STRING,
        field: "Telephone",
      },
      document: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "Document",
      },
      birthDate: {
        type: DataTypes.DATEONLY,
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
