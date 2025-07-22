const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class ProductSale extends Model {}

ProductSale.init(
  {
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    productId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employees",
        key: "id",
      },
    },
  },
  
  {
    sequelize,
    modelName: "productsale",
  }
);

module.exports = ProductSale;
