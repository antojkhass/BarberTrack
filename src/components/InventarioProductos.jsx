// components/InventarioProductos.jsx
import { useEffect } from "react";
import { fetchProducts } from "../api";

export function InventarioProductos({ productos,
  setProductos, setMostrarModalEliminar, setMostrarModalEditar, setMostrarModalAgregar }) {
    
  // const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const productosDesdeDB = await fetchProducts();
        setProductos(productosDesdeDB);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    }

    cargarProductos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <td>${prod.precio_costo}</td>
              <td>${prod.precio_venta}</td>
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
      </div>
    </>
  );
}
// import { useEffect, useState } from "react";
// import { postProduct, fetchProducts } from "../api";

// export function InventarioProductos({
//   setMostrarModalEliminar,
//   setMostrarModalEditar,
//   setMostrarModalAgregar,
// }) {
//   const [productos, setProductos] = useState([]);

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
//   }, []);

//   // ✅ Agregá acá la función para guardar productos
// const agregarProducto = async (nuevoProducto) => {
//   try {
//     const productoGuardado = await postProduct(nuevoProducto);
//     setProductos((prev) => [...prev, productoGuardado]);
//   } catch (error) {
//     console.error("Error al guardar producto:", error);
//   }
// };

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
//               style={{
//                 backgroundColor: prod.stock < 3 ? "#f8d7da" : "transparent",
//               }}
//             >
//               <td>{prod.nombre}</td>
//               <td>{prod.categoria}</td>
//               <td>${prod.precioCosto}</td>
//               <td>${prod.precioVenta}</td>
//               <td>{prod.stock}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
//         <button className="btn-confirmar" onClick={() => setMostrarModalAgregar(true)}>
//           Agregar Producto
//         </button>
//         <button className="btn-confirmar" onClick={() => setMostrarModalEliminar(true)}>
//           Eliminar Producto
//         </button>
//         <button className="btn-confirmar" onClick={() => setMostrarModalEditar(true)}>
//           Editar Producto
//         </button>
//       </div>
//     </>
//   );
// }
