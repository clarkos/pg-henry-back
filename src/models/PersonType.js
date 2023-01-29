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
    idPerson: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}