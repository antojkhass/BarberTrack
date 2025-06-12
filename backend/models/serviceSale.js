
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class ServiceSale extends Model {}

ServiceSale.init(
  {
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "servicesale",
  }
);

module.exports = ServiceSale;
