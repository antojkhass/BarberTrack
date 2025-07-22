const express = require("express");
const router = express.Router();
const { Product } = require("../models");

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await Product.findAll({
      where: { eliminado: false }  
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
});

// Obtener un producto por ID
router.get("/:id", async (req, res) => {
  try {
    const producto = await Product.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Adelanto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el adelanto", error });
  }
});

// Crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const nuevoProducto = await Product.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ message: "Error al crear producto", error });
  }
});

// Actualizar un producto
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await Product.update(req.body, {
      where: { id }
    });
    res.json({ message: "Producto actualizado", actualizado });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar producto", error });
  }
});

// Eliminar un producto
router.delete("/:id", async (req, res) => {
  try {
    const producto = await Product.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await producto.update({ eliminado: true });
    res.json({ message: "Producto marcado como eliminado" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
});



module.exports = router;


// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Product.destroy({ where: { id } });
//     res.json({ message: "Producto eliminado" });
//   } catch (error) {
//     res.status(500).json({ message: "Error al eliminar producto", error });
//   }
// });