const express = require("express");
const router = express.Router();
const { SaleStatus } = require("../models");

// GET todos los estados
router.get("/", async (req, res) => {
  try {
    const estados = await SaleStatus.findAll();
    res.json(estados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener estados", error });
  }
});

// Obtener un estado por ID
router.get("/:id", async (req, res) => {
  try {
    const estados = await SaleStatus.findByPk(req.params.id);
    if (!estados) {
      return res.status(404).json({ message: "Estado no encontrado" });
    }
    res.json(estados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el estado", error });
  }
});

// POST crear un nuevo estado
router.post("/", async (req, res) => {
  try {
    const nuevo = await SaleStatus.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ message: "Error al crear estado", error });
  }
});

// PUT actualizar un estado (opcional)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await SaleStatus.update(req.body, { where: { id } });
    res.json({ message: "Estado actualizado", actualizado });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar estado", error });
  }
});

// DELETE eliminar estado (opcional)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await SaleStatus.destroy({ where: { id } });
    res.json({ message: "Estado eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar estado", error });
  }
});

module.exports = router;
