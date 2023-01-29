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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idArtist: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idRecordPlace: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idProducer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idMixingMastery: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idArtDesigner: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publishDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    }
  });
};
