// components/ModalEditarProducto.jsx
import React, { useState, useEffect } from "react";
import "../index.css";

export function ModalEditarProducto({ visible, onClose, productos, onEditar }) {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precioCosto, setPrecioCosto] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");

  useEffect(() => {
    if (productoSeleccionado) {
      setNombre(productoSeleccionado.nombre);
      setCategoria(productoSeleccionado.categoria);
      setPrecioCosto(productoSeleccionado.precioCosto);
      setPrecioVenta(productoSeleccionado.precioVenta);
      setStock(productoSeleccionado.stock);
    } else {
      setNombre("");
      setCategoria("");
      setPrecioCosto("");
      setPrecioVenta("");
    }
  }, [productoSeleccionado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productoSeleccionado) return;

    const productoEditado = {
      ...productoSeleccionado,
      nombre,
      categoria,
      precioCosto: parseFloat(precioCosto),
      precioVenta: parseFloat(precioVenta),
    };

    onEditar(productoEditado);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <select
            required
            value={productoSeleccionado?.id || ""}
            onChange={(e) => {
              const idSeleccionado = parseInt(e.target.value);
              const producto = productos.find((p) => p.id === idSeleccionado);
              setProductoSeleccionado(producto);
            }}
          >
            <option value="">Seleccione un producto</option>
            {productos.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.nombre}
              </option>
            ))}
          </select>

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
            placeholder="Precio Costo"
            value={precioCosto}
            onChange={(e) => setPrecioCosto(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Precio Venta"
            value={precioVenta}
            onChange={(e) => setPrecioVenta(e.target.value)}
            required
          />

          <button type="submit" className="btn-confirmar">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}

// export default ModalEditarProducto;
