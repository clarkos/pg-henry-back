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
    idAlbum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    length: {
      type: DataTypes.TIME,
      allowNull: false
    }
  })
}