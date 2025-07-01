import { useState } from "react";
import { ModalAgregarProducto } from "./ModalAgregarProducto";

export function InventarioProductos({ setMostrarModalProducto, setMostrarModalEliminar, setMostrarModalEditar  }) {
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "Cera para cabello",
      categoria: "Peinado",
      precioCosto: 500,
      precioVenta: 1000,
      stock: 2,
    },
    {
      id: 2,
      nombre: "Shampoo para barba",
      categoria: "Barba",
      precioCosto: 700,
      precioVenta: 1400,
      stock: 5,
    },
    {
      id: 3,
      nombre: "Máquina Wahl",
      categoria: "Máquinas",
      precioCosto: 15000,
      precioVenta: 20000,
      stock: 1,
    },
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);

  const agregarProducto = (nuevoProducto) => {
    const productoConId = {
      ...nuevoProducto,
      id: productos.length + 1,
    };
    setProductos([...productos, productoConId]);
  };

  return (
    <>
      <h1>Inventario de Productos</h1>

      <table id="historialTable">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio Costo</th>
            <th>Precio Venta</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr
              key={prod.id}
              style={{
                backgroundColor: prod.stock < 3 ? "#f8d7da" : "transparent",
              }}
            >
              <td>{prod.nombre}</td>
              <td>{prod.categoria}</td>
              <td>${prod.precioCosto}</td>
              <td>${prod.precioVenta}</td>
              <td>{prod.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          className="btn-confirmar"
          onClick={() => setMostrarModalProducto(true)}>
          Agregar Producto
        </button>
        <button className="btn-confirmar" onClick={() => setMostrarModalEliminar(true)}>Eliminar Producto</button>
        <button className="btn-confirmar" onClick={() => setMostrarModalEditar(true)}>Editar Producto</button>
      </div>
    </>
  );
}

