// // components/ModalAgregarStock.jsx

import { useState } from "react";
import "./AdelantoModal.css";
import Swal from "sweetalert2";



const ModalStock = ({ productos, onClose, onConfirm }) => {
  const [productoId, setProductoId] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [cantidad, setCantidad] = useState(1);
  const [descripcion, setDescripcion] = useState("");

  const producto = productos.find((p) => p.id === parseInt(productoId));


  const handleSubmit = () => {
  if (!producto) {
    alert("Selecciona un producto");
    return;
  }

  if (!cantidad || cantidad <= 0) {
    alert("La cantidad debe ser mayor a 0.");
    return;
  }

  onConfirm({
    productId: producto.id,
    tipo,
    cantidad: parseInt(cantidad),
    descripcion,
  });

  onClose();

  Swal.fire({
    title: "Movimiento registrado",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
};

  return (
    <div className="modal">
      <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
        <h2>Registrar {tipo === "entrada" ? "entrada" : "salida"} de stock</h2>

        <div className="form-group">
          <label>Producto:</label>
          <select
            value={productoId}
            onChange={(e) => setProductoId(e.target.value)}
          >
            <option value="">-- Selecciona un producto --</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tipo de movimiento:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="entrada">Entrada</option>
            <option value="salida">Salida</option>
          </select>
        </div>

        <div className="form-group">
          <label>Cantidad:</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Descripción (opcional):</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

          <button className="btn-confirmar" onClick={handleSubmit}>Confirmar</button>
          
        {/* <div className="modal-actions">
        </div> */}
      </div>
    </div>
  );
};

export default ModalStock;



// import { useState } from "react";
// import { actualizarStockProducto } from "../api"; // Este endpoint debe existir en tu backend

// export default function ModalAgregarStock({ isOpen, onClose, productos, onStockAgregado }) {
//   const [productoId, setProductoId] = useState("");
//   const [cantidad, setCantidad] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!productoId || !cantidad || isNaN(cantidad) || Number(cantidad) <= 0) {
//       alert("Selecciona un producto y una cantidad válida.");
//       return;
//     }

//     try {
//       await actualizarStockProducto(productoId, Number(cantidad));
//       await onStockAgregado(); // Refresca productos en pantalla
//       setCantidad("");
//       setProductoId("");
//       onClose();
//     } catch (error) {
//       console.error("Error al agregar stock:", error);
//       alert("Ocurrió un error al agregar stock.");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <button className="cerrar" onClick={onClose}>
//           ❌
//         </button>
//         <h2>Agregar Stock</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Producto:</label>
//             <select
//               value={productoId}
//               onChange={(e) => setProductoId(e.target.value)}
//               required
//             >
//               <option value="">-- Selecciona --</option>
//               {productos.map((prod) => (
//                 <option key={prod.id} value={prod.id}>
//                   {prod.nombre}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label>Cantidad a agregar:</label>
//             <input
//               type="number"
//               value={cantidad}
//               onChange={(e) => setCantidad(e.target.value)}
//               min="1"
//               required
//             />
//           </div>

//           <button type="submit" className="btn-confirmar">
//             Confirmar
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
