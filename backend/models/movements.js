const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class Movement extends Model {}

Movement.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM("entrada", "salida"),
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: "La cantidad debe ser mayor a 0",
        },
      },
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "movement",
    tableName: "movements", 
    timestamps: false,
  }
);

module.exports = Movement;
