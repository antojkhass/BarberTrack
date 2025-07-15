// routes/employeeRoutes.js
const express = require("express");
const router = express.Router();
const { Employee } = require("../models");

// Obtener todos los empleados
router.get("/", async (req, res) => {
  try {
    const empleados = await Employee.findAll();
    res.status(200).json(empleados);
  } catch  {
    res.status(500).json({ error: "Error al obtener empleados." });
  }
});

// Obtener un empleado por ID
router.get("/:id", async (req, res) => {
  try {
    const advance = await Employee.findByPk(req.params.id);
    if (!advance) {
      return res.status(404).json({ message: "Adelanto no encontrado" });
    }
    res.json(advance);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el adelanto", error });
  }
});


// Crear un nuevo empleado
router.post("/", async (req, res) => {
  try {
    const nuevoEmpleado = await Employee.create(req.body);
    res.status(201).json(nuevoEmpleado);
  } catch  {
    res.status(400).json({ error: "Error al crear empleado." });
  }
});

// Actualizar un empleado
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await Employee.update(req.body, {
      where: { id }
    });
    res.json({ message: "Barbero actualizado", actualizado });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el barbero", error });
  }
});

// Eliminar un empleado
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Employee.destroy({ where: { id } });
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Error al eliminar empleado." });
  }
});

module.exports = router;
