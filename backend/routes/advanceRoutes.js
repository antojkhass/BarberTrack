// routes/advanceRoutes.js
const express = require("express");
const router = express.Router();
const Advance = require("../models/advance");

// Crear adelanto
router.post("/", async (req, res) => {
  try {
    const nuevoAdelanto = await Advance.create(req.body);
    res.status(201).json(nuevoAdelanto);
  } catch (error) {
    res.status(500).json({ message: "Error al crear adelanto", error });
  }
});

// Obtener todos los adelantos
router.get("/", async (req, res) => {
  try {
    const adelantos = await Advance.findAll();
    res.json(adelantos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener adelantos", error });
  }
});

// Obtener un adelanto por ID
router.get("/:id", async (req, res) => {
  try {
    const advance = await Advance.findByPk(req.params.id);
    if (!advance) {
      return res.status(404).json({ message: "Adelanto no encontrado" });
    }
    res.json(advance);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el adelanto", error });
  }
});


// Eliminar adelanto
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Advance.destroy({ where: { id: req.params.id } });
    if (eliminado) {
      res.json({ message: "Adelanto eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Adelanto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar adelanto", error });
  }
});

module.exports = router;
