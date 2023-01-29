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
    idSong: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idPerson: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
}