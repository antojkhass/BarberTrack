const express = require("express");
const router = express.Router();
const { Movement, Product } = require("../models");

// Crear un nuevo movimiento
router.post("/", async (req, res) => {
  const { productId, tipo, cantidad, descripcion } = req.body;

  if (!productId || !tipo || !cantidad || cantidad <= 0) {
    return res.status(400).json({ error: "Datos incompletos o inválidos" });
  }

  try {
    const producto = await Product.findByPk(productId);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Actualizar stock según el tipo de movimiento
    if (tipo === "entrada") {
      producto.stock += cantidad;
    } else if (tipo === "salida") {
      if (producto.stock < cantidad) {
        return res.status(400).json({ error: "Stock insuficiente" });
      }
      producto.stock -= cantidad;
    } else {
      return res.status(400).json({ error: "Tipo de movimiento inválido" });
    }

    // Guardar cambios
    await producto.save();

    // Crear el registro del movimiento
    const nuevoMovimiento = await Movement.create({
      productId,
      tipo,
      cantidad,
      descripcion,
    });

    res.status(201).json(nuevoMovimiento);
  } catch (error) {
    console.error("Error al registrar movimiento:", error);
    res.status(500).json({ error: "Error al registrar movimiento" });
  }
});

// (Opcional) Obtener todos los movimientos
router.get("/", async (req, res) => {
  try {
    const movimientos = await Movement.findAll({
      include: {
        model: Product,
        attributes: ["nombre", "categoria"],
      },
      order: [["fecha", "DESC"]],
    });
    res.json(movimientos);
  } catch (error) {
    console.error("Error al obtener movimientos:", error);
    res.status(500).json({ error: "Error al obtener movimientos" });
  }
});

module.exports = router;
