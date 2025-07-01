const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");


class Advance extends Model {}

Advance.init(
  {
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "advance",
  }
);




module.exports = Advance;
