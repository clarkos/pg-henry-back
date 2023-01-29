const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define("recipe", {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER,
      autoincrement: true,
      allowNull: false,
      primaryKey: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    identifier: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      // allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}