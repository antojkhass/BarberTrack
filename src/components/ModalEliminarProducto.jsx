// components/ModalEliminarProducto.jsx
import React, { useState } from "react";
import "../index.css";

export function ModalEliminarProducto({ visible, onClose, productos, onEliminar }) {
  const [productoSeleccionado, setProductoSeleccionado] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productoSeleccionado) {
      onEliminar(productoSeleccionado);
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Eliminar Producto</h2>
        <form onSubmit={handleSubmit}>
          <select
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
            required
          >
            <option value="">Seleccionar producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
          <button type="submit" className="btn-confirmar">
            Eliminar Producto
          </button>
        </form>
      </div>
    </div>
  );
}

// export default ModalEliminarProducto;
