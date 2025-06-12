const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class Service extends Model {}


Service.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'service',
    timestamps: false
});

module.exports = Service;