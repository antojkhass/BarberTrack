
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
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Efectivo",
      field: "payment_method",
    },
    propina: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 0,
      field: "propina",
    },
  },
  {
    sequelize,
    modelName: "servicesale",
  }
);

module.exports = ServiceSale;
