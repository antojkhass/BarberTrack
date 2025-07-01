// HistorialAdelantos.jsx
import { useState, useEffect } from "react";
import { fetchAdvances, fetchEmployees } from '../api'

export function HistorialAdelantos({recargar}) {

  const [filtroDesde, setFiltroDesde] = useState("");
  const [filtroHasta, setFiltroHasta] = useState("");
  const [filtroBarbero, setFiltroBarbero] = useState("");
  const [adelantos, setAdelantos] = useState([]);
  const [barberos, setBarberos] = useState([]);

useEffect(() => {
  async function cargarAdelantos() {
    const data = await fetchAdvances();
    setAdelantos(data)
    console.log("Adelantos cargados:", data);

  }

  cargarAdelantos();
}, [recargar]);

useEffect(() => {
  async function cargarBarberos() {
    const data = await fetchEmployees();
    setBarberos(data)
    
  }

  cargarBarberos();

}, [])

const handleResetFilters = () => {
  setFiltroDesde("");    
  setFiltroHasta("");
  setFiltroBarbero("");
};



const today = new Date();
const dayOfWeek = today.getDay(); // 0 (domingo) a 6 (sábado)
const monday = new Date(today);
monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
monday.setHours(0, 0, 0, 0);

const sunday = new Date(monday);
sunday.setDate(monday.getDate() + 6);
sunday.setHours(23, 59, 59, 999);

// Si el usuario puso una fecha “desde”, la uso; si no, cae en el lunes de la semana actual
const desdeDate = filtroDesde
  ? new Date(filtroDesde + "T00:00:00")
  : monday;

// Si el usuario puso una fecha “hasta”, la uso; si no, cae en el domingo de la semana actual
const hastaDate = filtroHasta
  ? new Date(filtroHasta + "T23:59:59")
  : sunday;


const filtrados = adelantos
  .filter((a) => {
const fechaAdelanto = new Date(a.fecha + "T00:00:00");
const barberoNombre = barberos.find(b => b.id === a.employee_id)?.nombre || "";
return fechaAdelanto >= desdeDate &&
       fechaAdelanto <= hastaDate &&
       barberoNombre.toLowerCase().includes(filtroBarbero.toLowerCase())

  })
  .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));



  return (
    <>
      <h1>Historial de Adelantos</h1>

      <div style={{ marginBottom: "20px" }}>

    <input
  type="date"
  value={filtroDesde}
  onChange={(e) => setFiltroDesde(e.target.value)}
  style={{ marginRight: "10px" }}
/>
<input
  type="date"
  value={filtroHasta}
  onChange={(e) => setFiltroHasta(e.target.value)}
  style={{ marginRight: "15px" }}
/>


    
        <input
          type="text"
          placeholder="Buscar barbero"
          value={filtroBarbero}
          onChange={(e) => setFiltroBarbero(e.target.value)}
        />
      </div>

<button onClick={handleResetFilters} className="btn-reset">
  Reiniciar filtros
</button>


<hr />

      <table id="historialTable">
        <thead>
          <tr>
            <th>Barbero</th>
            <th>Monto</th>
            <th>Motivo</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.length > 0 ? (
            filtrados.map((a) => (
              <tr key={a.id}>
                <td>  {
                   barberos.find((b) => b.id === a.employee_id)?.nombre || "Sin nombre"  }</td>
                <td>{a.monto}</td>
                <td>{a.motivo}</td>
                <td>{a.fecha}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No se encontraron adelantos para esta semana</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
