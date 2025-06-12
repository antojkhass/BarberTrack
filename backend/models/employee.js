const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class Employee extends Model {}

Employee.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "employee",
  }
);

module.exports = Employee;
