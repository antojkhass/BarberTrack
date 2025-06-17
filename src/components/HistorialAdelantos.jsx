// HistorialAdelantos.jsx
import { useState } from "react";

export function HistorialAdelantos() {
  const [filtroDesde, setFiltroDesde] = useState("");
  const [filtroHasta, setFiltroHasta] = useState("");

  const [filtroBarbero, setFiltroBarbero] = useState("");

  const adelantos = [
    { id: 1, barbero: "Juan", monto: 3000, motivo: "Compra", fecha: "2025-05-10" },
    { id: 2, barbero: "Pedro", monto: 2000, motivo: "Gastos", fecha: "2025-05-11" },
    { id: 3, barbero: "Juan", monto: 1500, motivo: "Otro", fecha: "2025-05-12" },
  ];

const today = new Date();
const dayOfWeek = today.getDay(); // 0 (domingo) a 6 (sábado)
const monday = new Date(today);
monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
monday.setHours(0, 0, 0, 0);

const sunday = new Date(monday);
sunday.setDate(monday.getDate() + 6);
sunday.setHours(23, 59, 59, 999);

const filtrados = adelantos
  .filter((a) => {
    const fechaAdelanto = new Date(a.fecha);
    return fechaAdelanto >= monday && fechaAdelanto <= sunday;
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
                <td>{a.barbero}</td>
                <td>${a.monto}</td>
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
