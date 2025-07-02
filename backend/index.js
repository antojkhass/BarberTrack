// backend/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const employeeRoutes = require("./routes/employeeRoutes");
const productRoutes = require("./routes/productRoutes");
const advanceRoutes = require("./routes/advanceRoutes");
const productSaleRoutes = require("./routes/productSaleRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const saleStatus = require("./routes/saleStatusRoutes");
const serviceSale = require("./routes/serviceSaleRoutes");

// Usar rutas
app.use("/api/employees", employeeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/advances", advanceRoutes);
app.use("/api/productSale", productSaleRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/saleStatus", saleStatus);
app.use("/api/serviceSale", serviceSale);


// // Probar conexión y sincronizar modelos
// require("./models"); // Esto importa models/index.js y ejecuta syncModels()
const { sequelize } = require("./models");

sequelize
.sync({ alter: true })
.then(() => {
  console.log("✅ Tablas sincronizadas con la base de datos");
  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http: //localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ No se pudo sincronizar la base de datos:", err);
});

// // Iniciar servidor
// app.listen(PORT, () => {
//   console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
// });
