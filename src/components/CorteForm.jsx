import { useState, useEffect } from "react";
import { fetchEmployees, fetchService, fetchSaleStatus } from "../api";


export function CorteForm() {
 

  const [metodoPago, setMetodoPago] = useState("Efectivo");
  const [propina, setPropina] = useState("");

  const [barberos, setBarberos] = useState([])
  const [barbero, setBarbero] = useState(""); 
  const [servicio, setServicio] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(""); 
  const [estadoVentaSeleccionado, setEstadoVentaSeleccionado] = useState("");
  const [estadoVenta, setEstadoVenta] = useState([]);




  useEffect(() => {
  async function cargarBarberos() {
    const data = await fetchEmployees();
    setBarberos(data);
  }

  cargarBarberos();
}, []);

  useEffect(() => {
  async function cargarServicios() {
    const data = await fetchService();
    setServicio(data);
  }

  cargarServicios();
}, []);

  useEffect(() => {
  async function cargarEstado() {
    const data = await fetchSaleStatus();
    setEstadoVenta(data);
  }

  cargarEstado();
}, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Formulario enviado:");
    console.log("Barbero:", barberos);
    console.log("Servicio:", servicio);
    console.log("Estado de venta:", estadoVenta);
    console.log("Método de pago:", metodoPago);
    console.log("Propina:", propina);
  };

  return (
    <>

<div className="container">
    <h1>Registrar Corte</h1>
   
    <form onSubmit={handleSubmit}>
      <label htmlFor="barbero">Barbero:</label>
      <select id="barbero" value={barbero} onChange={(e) => setBarbero(e.target.value)} required>
     <option value="">Selecciona un barbero</option>
      {barberos.map((b) => (
      <option key={b.id} value={b.nombre}>{b.nombre}</option>
        ))}
      </select>

      <label htmlFor="servicio">Servicio:</label>
      <select id="servicio" value={servicioSeleccionado} onChange={(e) => setServicioSeleccionado(e.target.value)} required>
        <option value="">Seleccione un servicio</option>
        {servicio.map((b) => (
      <option key={b.id} value={b.name}>{b.name}</option>
        ))}
      </select>

      <label htmlFor="estadoVenta">Estado de Venta:</label>
      <select id="estadoVenta" value={estadoVentaSeleccionado} onChange={(e) => setEstadoVentaSeleccionado(e.target.value)} required>
        <option value="">Seleccione el estado:</option>
            {estadoVenta.map((b) => (
      <option key={b.id} value={b.estado}>{b.estado}</option>
        ))}
      </select>

      <label htmlFor="metodoPago">Método de Pago:</label>
      <select id="metodoPago" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} required>
        <option value="Efectivo">Efectivo</option>
        <option value="Tarjeta">Tarjeta</option>
        <option value="QR">QR</option>
        <option value="Transferencia">Transferencia</option>
        <option value="Binance">Binance</option>
        
      </select>

      <label htmlFor="propina">Propina:</label>
      <input
        type="number"
        id="propina"
        value={propina}
        onChange={(e) => setPropina(e.target.value)}
        min="0"
        step="0.01"
        placeholder="0.00"
      />

      <button type="submit">Registrar Corte</button>
    </form>
    </div>
    </>
  );
}
