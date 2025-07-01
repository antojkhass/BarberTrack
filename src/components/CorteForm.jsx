// src/components/CorteForm.jsx
import { useState, useEffect } from 'react';
import {
  fetchEmployees,
  fetchService,
  fetchSaleStatus,
  postServiceSale,
  fetchServiceSales
} from '../api';
import { CortesPorBarbero } from './CortesPorBarbero';

export function CorteForm() {
  const [barberos, setBarberos] = useState([]);
  const [cortes, setCortes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [estadosVenta, setEstadosVenta] = useState([]);

  // Campos del formulario
  const [barbero, setBarbero] = useState('');
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [estadoVentaSeleccionado, setEstadoVentaSeleccionado] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [propina, setPropina] = useState('');

  // Barbero seleccionado para ver cortes
  const [selectedBarberoId, setSelectedBarberoId] = useState(null);

  // Carga inicial de datos
  useEffect(() => {
    fetchEmployees().then(setBarberos);
    fetchServiceSales().then(setCortes);
    fetchService().then(setServicios);
    fetchSaleStatus().then(setEstadosVenta);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const precio = servicios.find(s => s.id === servicioSeleccionado)?.price ?? 0;

    const nuevoCorte = {
      employee_id: barbero,
      service_id: servicioSeleccionado,
      estado_id: estadoVentaSeleccionado,
      total: precio,
      paymentMethod: metodoPago,
      propina: Number(propina),
      fecha: new Date().toISOString().split('T')[0],
    };

    try {
      await postServiceSale(nuevoCorte);
      // recargar cortes
      const fresh = await fetchServiceSales();
      setCortes(fresh);
      // opcional: limpiar form
      setBarbero('');
      setServicioSeleccionado('');
      setEstadoVentaSeleccionado('');
      setMetodoPago('');
      setPropina('');
    } catch {
      alert('No se pudo registrar el corte');
    }
  };

  return (
    <div className="container">
      <h1>Registrar Corte</h1>

      <form onSubmit={handleSubmit}>
        <label>Barbero:</label>
        <select
          value={barbero}
          onChange={e => setBarbero(Number(e.target.value))}
          required
        >
          <option value="">Seleccione un barbero</option>
          {barberos.map(b => (
            <option key={b.id} value={b.id}>{b.nombre}</option>
          ))}
        </select>

        <label>Servicio:</label>
        <select
          value={servicioSeleccionado}
          onChange={e => setServicioSeleccionado(Number(e.target.value))}
          required
        >
          <option value="">Seleccione un servicio</option>
          {servicios.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <label>Estado de Venta:</label>
        <select
          value={estadoVentaSeleccionado}
          onChange={e => setEstadoVentaSeleccionado(Number(e.target.value))}
          required
        >
          <option value="">Seleccione el estado</option>
          {estadosVenta.map(st => (
            <option key={st.id} value={st.id}>{st.estado}</option>
          ))}
        </select>

        <label>Método de Pago:</label>
        <select
          value={metodoPago}
          onChange={e => setMetodoPago(e.target.value)}
          required
        >
          <option value="">Seleccione el método</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="QR">QR</option>
          <option value="Transferencia">Transferencia</option>
          <option value="Binance">Binance</option>
        </select>

        <label>Propina:</label>
        <input
          type="number"
          value={propina}
          onChange={e => setPropina(e.target.value)}
          min="0"
          step="0.01"
          placeholder="0.00"
        />

        <button type="submit">Registrar Corte</button>
      </form>

      {/* Botones para elegir barbero y ver su historial */}
      <div style={{ display: 'flex', gap: 8, margin: '1.5rem 0' }}>
        {barberos.map(b => (
          <button
            key={b.id}
            onClick={() => setSelectedBarberoId(b.id)}
            style={{
              padding: '0.5rem 1rem',
              background: b.id === selectedBarberoId ? '#555' : '#777',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            {b.nombre}
          </button>
        ))}
      </div>

      {/* Aquí mostramos estático los cortes agrupados por fecha */}
      {selectedBarberoId && (
        <CortesPorBarbero
          cortes={cortes}
          barberoId={selectedBarberoId}
        />
      )}
    </div>
  );
}
