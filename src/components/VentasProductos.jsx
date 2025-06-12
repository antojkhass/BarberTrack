// components/VentasProductos.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";


export function VentasProductos({ productos, setProductos }) {
  const [barbero, setBarbero] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [ventas, setVentas] = useState([]);
  const [stockDisponible, setStockDisponible] = useState(null);
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");

  const barberos = ["Juan", "Pedro", "Marcos", "Caribe"];

const handleSubmit = (e) => {
  e.preventDefault();
  const productoIndex = productos.findIndex((p) => p.nombre === producto);
  if (productoIndex === -1) return;

  const productoInfo = productos[productoIndex];

  if (productoInfo.stock < cantidad) {
    Swal.fire({
  icon: "error",
  title: "Stock insuficiente",
  text: "No hay suficiente stock disponible para esta venta",
});

    return;
  }

  // Crear nueva venta
  const nuevaVenta = {
    id: Date.now(),
    barbero,
    producto,
    cantidad,
    precio: productoInfo.precioVenta,
    total: productoInfo.precioVenta * cantidad,
    fecha: new Date().toISOString().split("T")[0],
  };

  // Actualizar estado de ventas
  setVentas((prev) => [...prev, nuevaVenta]);

  // Actualizar stock
  const productosActualizados = [...productos];
  productosActualizados[productoIndex].stock -= cantidad;
  setProductos(productosActualizados);

  // Resetear formulario
  setBarbero("");
  setProducto("");
  setCantidad(1);

  Swal.fire({
  icon: "success",
  title: "Venta registrada",
  text: "La venta se ha registrado correctamente",
  timer: 2000,
  showConfirmButton: false,
});

};

  const ventasFiltradas = ventas.filter((venta) => {
    const fechaVenta = new Date(venta.fecha);
    const desde = fechaDesde ? new Date(fechaDesde) : null;
    const hasta = fechaHasta ? new Date(fechaHasta) : null;
    const coincideFecha = desde || hasta
      ? (!desde || fechaVenta >= desde) && (!hasta || fechaVenta <= hasta)
      : fechaVenta >= lunes && fechaVenta <= domingo;
    const coincideProducto = filtroNombre
      ? venta.producto.toLowerCase().includes(filtroNombre.toLowerCase())
      : true;
    return coincideFecha && coincideProducto;
  });

 return (
  <>
    <h1>Ventas de Productos</h1>

    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <select
            value={barbero}
            onChange={(e) => setBarbero(e.target.value)}
            required
          >
            <option value="">Seleccione barbero</option>
            {barberos.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select
            value={producto}
            onChange={(e) => {
            const seleccion = e.target.value;
            setProducto(seleccion);
            const productoSeleccionado = productos.find(p => p.nombre === seleccion);
            setStockDisponible(productoSeleccionado?.stock ?? null);
            setCantidad(1);

            }}

            required
          >
             <option value="">Seleccione producto</option>
              {productos.map((p) => (
                <option key={p.nombre} value={p.nombre}>{p.nombre}</option>
              ))}
          </select>
          
          {stockDisponible !== null && (
           <p style={{ fontSize: "14px", color: stockDisponible < 3 ? "red" : "green" }}>
              Stock disponible: {stockDisponible}
            </p>
            )}


          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
            min={1}
            placeholder="Cantidad"
            required
          />

          {cantidad > stockDisponible && (
          <p style={{ color: "red", fontSize: "13px" }}>
          No hay suficiente stock para esta venta
          </p>
            )}


          <button type="submit" className="btn-confirmar">
            Registrar Venta
          </button>
        </div>
      </form>
    </div>

    <h2>Historial de Ventas</h2>

    <div style={{ marginBottom: "20px" }}>
      <input
        type="date"
        value={fechaDesde}
        onChange={(e) => setFechaDesde(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="date"
        value={fechaHasta}
        onChange={(e) => setFechaHasta(e.target.value)}
        style={{ marginRight: "15px" }}
      />
        <input
          type="text"
          placeholder="Buscar producto"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />
    </div>

    <table id="historialTable">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Barbero</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {ventasFiltradas.length > 0 ? (
            ventasFiltradas.map((v) => (
              <tr key={v.id}>
                <td>{v.fecha}</td>
                <td>{v.barbero}</td>
                <td>{v.producto}</td>
                <td>{v.cantidad}</td>
                <td>${v.total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                {fechaDesde || fechaHasta || filtroNombre
                  ? "No se encontraron ventas con ese filtro"
                  : "No hay ventas esta semana"}
              </td>
            </tr>
          )}

      </tbody>
    </table>
  </>
);
}

// export default VentasProductos;
