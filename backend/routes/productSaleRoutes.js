const express = require("express");
const router = express.Router();
const { ProductSale, Product, Employee } = require("../models");

// Obtener todas las ventas de productos
router.get("/", async (req, res) => {
  try {
    const ventas = await ProductSale.findAll({
      include: [
        { model: Product, attributes: ["nombre"] },
        { model: Employee, attributes: ["nombre"] },
      ],
      order: [["fecha", "DESC"]],
    });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ventas", error });
  }
});

// Obtener una venta por ID
router.get("/:id", async (req, res) => {
  try {
    const advance = await ProductSale.findByPk(req.params.id);
    if (!advance) {
      return res.status(404).json({ message: "Adelanto no encontrado" });
    }
    res.json(advance);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el adelanto", error });
  }
});

// Registrar una nueva venta de producto
router.post("/", async (req, res) => {
  try {
    const { cantidad, total, fecha, productId, employeeId } = req.body;

    const producto = await Product.findByPk(productId);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (producto.stock < cantidad) {
      return res.status(400).json({ message: "Stock insuficiente" });
    }

    const nuevaVenta = await ProductSale.create({
      cantidad,
      total,
      fecha,
      productId,
      employeeId,
    });

    producto.stock -= cantidad;
    await producto.save();

    res.status(201).json(nuevaVenta);
  } catch (error) {
    console.error("Error al registrar venta:", error);
    res.status(500).json({ message: "Error al registrar la venta", error });
  }
});

// Eliminar una venta de producto
router.delete("/:id", async (req, res) => {
  try {
    const venta = await ProductSale.findByPk(req.params.id);
    if (!venta) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    await venta.destroy();
    res.status(200).json({ message: "Venta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la venta", error });
  }
});

// Cambiar el estado de una venta específica
router.put("/:id/estado", async (req, res) => {
  try {
    const { id } = req.params;
    const { estado_id } = req.body;

    const actualizada = await ProductSale.update(
      { estado_id },
      { where: { id } }
    );

    res.json({ message: "Estado de venta actualizado", actualizada });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar estado de venta", error });
  }
});



module.exports = router;
