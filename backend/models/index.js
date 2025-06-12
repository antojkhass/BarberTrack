const { Sequelize } = require("sequelize");
const sequelize = require("../database");

// Importar modelos
const Employee = require("./employee");
const Product = require("./product");
const ProductSale = require("./productSale");
const Advance = require("./advance");
const Service = require("./service");
const SaleStatus = require("./saleStatus");
const ServiceSale = require("./serviceSale");


// Asociaciones (pueden comentarse si querés evitar relaciones por ahora)
Employee.hasMany(Advance, { foreignKey: "employee_id" });
Advance.belongsTo(Employee, { foreignKey: "employee_id" });

Employee.hasMany(ProductSale, { foreignKey: "employee_id" });
ProductSale.belongsTo(Employee, { foreignKey: "employee_id" });

Product.hasMany(ProductSale, { foreignKey: "product_id" });
ProductSale.belongsTo(Product, { foreignKey: "product_id" });

ProductSale.belongsTo(SaleStatus, { foreignKey: 'estado_id', as: 'estadoVenta' });
SaleStatus.hasMany(ProductSale, { foreignKey: 'estado_id' });


ServiceSale.belongsTo(Employee, { foreignKey: "employee_id" });
ServiceSale.belongsTo(Service, { foreignKey: "service_id" });
ServiceSale.belongsTo(SaleStatus, { foreignKey: "estado_id", as: "estadoVenta" });



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
  ServiceSale
};
