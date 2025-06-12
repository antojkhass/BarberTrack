// components/ModalAgregarProducto.jsx
import React, { useState } from "react";
import "../index.css"; // Para asegurarte que tenga los mismos estilos globales

export function ModalAgregarProducto({ visible, onClose, onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precioCosto, setPrecioCosto] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProducto = {
      nombre,
      categoria,
      precio_costo: parseFloat(precioCosto),
      precio_venta: parseFloat(precioVenta),
      stock: parseInt(stock),
    };

    onAgregar(nuevoProducto);
    onClose();
    setNombre("");
    setCategoria("");
    setPrecioCosto("");
    setPrecioVenta("");
    setStock("");
  };

  if (!visible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Categoría"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Precio Costo"
            value={precioCosto}
            onChange={(e) => setPrecioCosto(e.target.value)}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Precio Venta"
            value={precioVenta}
            onChange={(e) => setPrecioVenta(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Stock Inicial"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <button type="submit" className="btn-confirmar">
            Registrar Producto
          </button>
        </form>
      </div>
    </div>
  );
}

// export default ModalAgregarProducto;
