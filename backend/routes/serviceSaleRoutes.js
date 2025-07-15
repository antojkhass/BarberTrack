// backend/routes/serviceSaleRoutes.js
const express = require("express");
const router = express.Router();
const { ServiceSale, Employee, Service, SaleStatus } = require("../models");

// Obtener todas las ventas de servicios
router.get("/", async (req, res) => {
  try {
    const ventas = await ServiceSale.findAll({
      //   attributes: [
      //   "id",
      //   "employee_id",
      //   "service_id",
      //   "estado_id",
      //   "paymentMethod",  
      //   "propina",        
      //   "total",
      //   "fecha",
      //   "createdAt",
      //   "updatedAt"
      // ],
      include: [
        { model: Employee },
        { model: Service },
        { model: SaleStatus, as: "estadoVenta" },
      ],
    });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ventas", error });
  }
});

// Crear una nueva venta de servicio
router.post("/", async (req, res) => {
  try {
    const nuevaVenta = await ServiceSale.create(req.body);
    res.status(201).json({ message: "Venta registrada", nuevaVenta });
  } catch (error) {
    res.status(400).json({ message: "Error al registrar la venta", error });
  }
});

// Eliminar una venta de servicio
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ServiceSale.destroy({ where: { id } });
    res.json({ message: "Venta eliminada" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar la venta", error });
  }
});

// Actualizar cualquier campo de una venta de servicio
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // req.body tendrá { total, paymentMethod, service_id, propina, estado_id, ... }
    const [filasActualizadas] = await ServiceSale.update(req.body, {
      where: { id },
    });
    if (!filasActualizadas) {
      return res.status(404).json({ message: "Corte no encontrado" });
    }
    // Opcional: volver a buscar y devolver el objeto actualizado
    const actualizado = await ServiceSale.findByPk(id, {
      include: [
        { model: Employee },
        { model: Service },
        { model: SaleStatus, as: "estadoVenta" },
      ],
    });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el corte", error });
  }
});



module.exports = router;
