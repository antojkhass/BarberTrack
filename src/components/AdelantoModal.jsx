import React, { useState, useEffect } from "react";
import "./AdelantoModal.css";
import { fetchEmployees } from "../api";

export function AdelantoModal({ onClose, onGuardar }) {
  const [barbero, setBarbero] = useState("");
  const [monto, setMonto] = useState("");
  const [motivo, setMotivo] = useState("");
  const[barberos,setBarberos] = useState([]);


 useEffect(() => {
  async function cargarBarberos() {
    const data = await fetchEmployees();
    setBarberos(data);
  }

  cargarBarberos();
}, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!barbero || !monto || !motivo) {
      alert("Por favor completá todos los campos.");
      return;
    }

    const adelanto = {
      employee_id: parseInt(barbero),
      monto: parseFloat(monto),
      motivo,
      fecha: new Date().toISOString(),
    };

    onGuardar(adelanto);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Registrar Adelanto</h2>
        <form onSubmit={handleSubmit}>
          <label>Barbero:</label>
          <select value={barbero} onChange={(e) => setBarbero(e.target.value)} required>
            <option value="">Seleccionar</option>
            {barberos.map((barbero) => (
              <option key={barbero.id} value={barbero.id}>
                {barbero.nombre}
              </option>
            ))}
          </select>

          <label>Monto:</label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
          />

          <label>Motivo:</label>
          <input
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
          />

          <button type="submit" className="btn-confirmar" style={{ marginTop: "20px" }}>
            Registrar Adelanto
          </button>
        </form>
      </div>
    </div>
  );
}

