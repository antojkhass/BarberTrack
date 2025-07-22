// // components/InventarioProductos.jsx
// import { useState, useEffect } from "react";
// import { fetchProducts } from "../api";
// // import ModalAgregarStock from "./ModalAgregarStock";

// export function InventarioProductos({
//   productos,
//   setProductos,
//   setMostrarModalEliminar,
//   setMostrarModalEditar,
//   setMostrarModalAgregar,
// }) {
//   const [mostrarModalAgregarStock, setMostrarModalAgregarStock] = useState(false);

//   useEffect(() => {
//     async function cargarProductos() {
//       try {
//         const productosDesdeDB = await fetchProducts();
//         setProductos(productosDesdeDB);
//       } catch (error) {
//         console.error("Error al cargar productos:", error);
//       }
//     }

//     cargarProductos();
//   }, [setProductos]);

//   return (
//     <>
//       <h1>Inventario de Productos</h1>

//       <table id="historialTable">
//         <thead>
//           <tr>
//             <th>Nombre</th>
//             <th>Categoría</th>
//             <th>Precio Costo</th>
//             <th>Precio Venta</th>
//             <th>Stock</th>
//           </tr>
//         </thead>
//         <tbody>
//           {productos.map((prod) => (
//             <tr
//               key={prod.id}
//               style={{ backgroundColor: prod.stock < 3 ? "#f8d7da" : "transparent" }}
//             >
//               <td>{prod.nombre}</td>
//               <td>{prod.categoria}</td>
//               <td>{prod.precio_costo}</td>
//               <td>{prod.precio_venta}</td>
//               <td>{prod.stock}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
//         <button className="btn-confirmar" onClick={() => setMostrarModalAgregar(true)}>
//           Agregar Producto
//         </button>
//         <button className="btn-confirmar" onClick={() => setMostrarModalEliminar(true)}>
//           Eliminar Producto
//         </button>
//         <button className="btn-confirmar" onClick={() => setMostrarModalEditar(true)}>
//           Editar Producto
//         </button>
//         <button className="btn-confirmar" onClick={() => setMostrarModalAgregarStock(true)}>
//           Reponer Stock
//         </button>
//       </div>

//       {/* Modal para reponer stock */}
//       <ModalAgregarStock
//         isOpen={mostrarModalAgregarStock}
//         onClose={() => setMostrarModalAgregarStock(false)}
//         productos={productos}
//         onStockAgregado={async () => {
//           const productosActualizados = await fetchProducts();
//           setProductos(productosActualizados);
//         }}
//       />
//     </>
//   );
// }


import { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import ModalStock from "./ModalStock"; // Asegurate de tener este archivo creado


export function InventarioProductos({
  productos,
  setProductos,
  setMostrarModalEliminar,
  setMostrarModalEditar,
  setMostrarModalAgregar
}) {
  const [mostrarModalStock, setMostrarModalStock] = useState(false);

  useEffect(() => {
    cargarProductos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function cargarProductos() {
    try {
      const productosDesdeDB = await fetchProducts();
      setProductos(productosDesdeDB);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  }

  const registrarMovimiento = async (movimiento) => {
    try {
      const respuesta = await fetch("http://localhost:8080/api/movements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movimiento),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        alert(resultado.error || "Error al registrar el movimiento");
        return;
      }

      cargarProductos();
    } catch (error) {
      console.error("Error al registrar movimiento:", error);
      alert("Error al registrar movimiento");
    }
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
              style={{ backgroundColor: prod.stock < 3 ? "#f8d7da" : "transparent" }}
            >
              <td>{prod.nombre}</td>
              <td>{prod.categoria}</td>
              <td>{prod.precio_costo}</td>
              <td>{prod.precio_venta}</td>
              <td>{prod.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button className="btn-confirmar" onClick={() => setMostrarModalAgregar(true)}>
          Agregar Producto
        </button>
        <button className="btn-confirmar" onClick={() => setMostrarModalEliminar(true)}>
          Eliminar Producto
        </button>
        <button className="btn-confirmar" onClick={() => setMostrarModalEditar(true)}>
          Editar Producto
        </button>
        <button className="btn-confirmar" onClick={() => setMostrarModalStock(true)}>
          Agregar Entrada / Salida
        </button>
      </div>

      {mostrarModalStock && (
        <ModalStock
          productos={productos}
          onClose={() => setMostrarModalStock(false)}
          onConfirm={registrarMovimiento}
        />
      )}
    </>
  );
}
