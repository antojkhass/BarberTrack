// backend/routes/serviceSaleRoutes.js
const express = require("express");
const router = express.Router();
const { ServiceSale, Employee, Service, SaleStatus } = require("../models");

// Obtener todas las ventas de servicios
router.get("/", async (req, res) => {
  try {
    const ventas = await ServiceSale.findAll({
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

// Actualizar el estado de una venta (Pendiente -> Pagado, etc)
router.put("/:id/estado", async (req, res) => {
  try {
    const { id } = req.params;
    const { estado_id } = req.body;
    const actualizada = await ServiceSale.update(
      { estado_id },
      { where: { id } }
    );
    res.json({ message: "Estado actualizado", actualizada });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el estado", error });
  }
});

module.exports = router;
