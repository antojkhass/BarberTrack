const { Sequelize } = require("sequelize");
const sequelize = require("../database");

// Importar modelos
const Employee = require("./employee");
const Product = require("./product");
const ProductSale = require("./productsale");
const Advance = require("./advance");
const Service = require("./service");
const SaleStatus = require("./saleStatus");
const ServiceSale = require("./serviceSale");
const Movement = require("./movements");


// Asociaciones (pueden comentarse si querés evitar relaciones por ahora)
// Adelantos
Employee.hasMany(Advance, { foreignKey: "employee_id" });
Advance.belongsTo(Employee, { foreignKey: "employee_id" });

// Ventas de productos
Product.hasMany(ProductSale, { foreignKey: "productId" });
ProductSale.belongsTo(Product, { foreignKey: "productId" });

Employee.hasMany(ProductSale, { foreignKey: "employeeId" });
ProductSale.belongsTo(Employee, { foreignKey: "employeeId" });

SaleStatus.hasMany(ProductSale, { foreignKey: 'estado_id' });
ProductSale.belongsTo(SaleStatus, { foreignKey: 'estado_id', as: 'estadoVenta' });

// Ventas de servicios
ServiceSale.belongsTo(Employee, { foreignKey: "employee_id" });
ServiceSale.belongsTo(Service, { foreignKey: "service_id" });
ServiceSale.belongsTo(SaleStatus, { foreignKey: "estado_id", as: "estadoVenta" });

Product.hasMany(Movement, { foreignKey: "productId" });
Movement.belongsTo(Product, { foreignKey: "productId" });


// Sincronización
const syncModels = async () => {
  try {
    await sequelize.sync();
    console.log("Modelos sincronizados correctamente.");
  } catch (error) {
    console.error("Error al sincronizar modelos:", error);
  }
};

syncModels();

module.exports = {
  sequelize,
  Employee,
  Product,
  ProductSale,
  Advance,
  Service,
  SaleStatus,
  ServiceSale,
  Movement
};
