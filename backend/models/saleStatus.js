const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class SaleStatus extends Model {}

SaleStatus.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
    estado: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: "salestatus",
  timestamps: false,
});

module.exports = SaleStatus;
