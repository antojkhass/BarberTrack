// backend/routes/serviceRoutes.js
const express = require("express");
const router = express.Router();
const { Service } = require("../models");

// Obtener todos los servicios
router.get("/", async (req, res) => {
  try {
    const servicios = await Service.findAll();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener servicios", error });
  }
});

// Obtener servicio por ID
router.get("/:id", async (req, res) => {
  try {
    const advance = await Service.findByPk(req.params.id);
    if (!advance) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    res.json(advance);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el Servicio", error });
  }
});

// Crear un nuevo servicio
router.post("/", async (req, res) => {
  try {
    const nuevo = await Service.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el servicio", error });
  }
});

// Actualizar un servicio
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await Service.update(req.body, {
      where: { id }
    });
    res.json({ message: "Servicio actualizado", actualizado });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el servicio", error });
  }
});

// Eliminar un servicio
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Service.destroy({ where: { id } });
    if (eliminado === 0) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    res.json({ message: "Servicio eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el servicio", error });
  }
});

module.exports = router;
