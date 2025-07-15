import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import "./AdelantoModal.css";

export function EditCorteModal({ corte, servicios, estadosVenta, onSave, onClose }) {
  const [monto, setMonto] = useState(corte.total);
  const [metodoPago, setMetodoPago] = useState(corte.paymentMethod);
  const [servicioId, setServicioId] = useState(corte.service_id);
  const [propina, setPropina] = useState(corte.propina);
  const [estadoId, setEstadoId] = useState(corte.estado_id);

  // reset cuando cambia corte
  useEffect(() => {
    setMonto(corte.total);
    setMetodoPago(corte.paymentMethod);
    setServicioId(corte.service_id);
    setPropina(corte.propina);
    setEstadoId(corte.estado_id);
  }, [corte]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await onSave({
        ...corte,
        total: Number(monto),
        paymentMethod: metodoPago,
        service_id: servicioId,
        propina: Number(propina),
        estado_id: estadoId
      });
      onClose();
    } catch  {
      Swal.fire('Error', 'No se pudo guardar cambios.', 'error');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
        <h2>Editar Corte</h2>
        <form onSubmit={handleSubmit}>
          <label>Monto:</label>
          <input
            type="number"
            value={monto}
            onChange={e => setMonto(e.target.value)}
            required
          />

          <label>Método de Pago:</label>
          <select
            value={metodoPago}
            onChange={e => setMetodoPago(e.target.value)}
            required
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="QR">QR</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Binance">Binance</option>
          </select>

          <label>Servicio:</label>
          <select
            value={servicioId}
            onChange={e => setServicioId(Number(e.target.value))}
            required
          >
            {servicios.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <label>Estado de Venta:</label>
          <select
            value={estadoId}
            onChange={e => setEstadoId(Number(e.target.value))}
            required
          >
            {estadosVenta.map(st => (
              <option key={st.id} value={st.id}>{st.estado}</option>
            ))}
          </select>

          <label>Propina:</label>
          <input
            type="number"
            value={propina}
            onChange={e => setPropina(e.target.value)}
            min="0"
            step="0.01"
          />
          <button type="submit" className="btn-confirmar" style={{ marginTop: "20px" }}>Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
}
