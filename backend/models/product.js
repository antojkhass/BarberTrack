const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class Product extends Model {}

Product.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio_costo: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    precio_venta: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eliminado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  },
  {
    sequelize,
    modelName: "product",
  }
);

module.exports = Product;
