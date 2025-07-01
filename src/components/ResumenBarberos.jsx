import React, { useEffect, useState } from "react";
import { fetchEmployees, fetchServiceSales } from '../api';
import { HistorialCortesModal } from './HistorialCortesModal';

export function ResumenBarberos() {
  const [barberos, setBarberos] = useState([]);
  const [cortes, setCortes] = useState([]);
  const [resumenes, setResumenes] = useState([]);
  const [showHistorial, setShowHistorial] = useState(false);

  // Estados para control manual de porcentaje, día 100% y barbero seleccionado
  const [selectedShare, setSelectedShare] = useState(55);
  const [selectedDay100, setSelectedDay100] = useState(null);
  const [selectedBarberoId, setSelectedBarberoId] = useState(null);

  // Carga de barberos
  useEffect(() => {
    async function cargarBarberos() {
      const data = await fetchEmployees();
      setBarberos(data);
    }
    cargarBarberos();
  }, []);

  // Carga de cortes (serviceSales)
  useEffect(() => {
    async function cargarCortes() {
      const data = await fetchServiceSales();
      setCortes(data);
    }
    cargarCortes();
  }, []);

  // Generación de resúmenes cuando cambian barberos o cortes
  useEffect(() => {
    if (!barberos.length) return;

    const nuevosResumenes = barberos.map(b => {
      const susCortes = cortes.filter(c => c.employee_id === b.id);
      const totalGeneral = susCortes.reduce((sum, c) => sum + c.monto, 0);
      const totalesPorDia = susCortes.reduce((acc, c) => {
        acc[c.fecha] = (acc[c.fecha] || 0) + c.monto;
        return acc;
      }, {});

      return {
        id: b.id,
        nombre: b.nombre,
        totalGeneral,
        totalesPorDia
      };
    });

    setResumenes(nuevosResumenes);
  }, [barberos, cortes]);

  return (
    <div>
      {/* Lista de botones para seleccionar barbero */}
      <div className="barbero-buttons" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {resumenes.map(r => (
          <button
            key={r.id}
            onClick={() => {
              setSelectedBarberoId(r.id);
              setShowHistorial(false); // resetear modal al cambiar barbero
            }}
            className={r.id === selectedBarberoId ? 'active' : ''}
            style={{ padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
          >
            {r.nombre}
          </button>
        ))}
      </div>

      {/* Detalle del barbero seleccionado */}
      {selectedBarberoId ? (
        resumenes
          .filter(r => r.id === selectedBarberoId)
          .map(r => {
            const resultados = Object.entries(r.totalesPorDia).map(([fecha, total]) => {
              if (fecha === selectedDay100) {
                return { fecha, parteBarbero: total, parteLocal: 0 };
              }
              const parteBarbero = total * (selectedShare / 100);
              return {
                fecha,
                parteBarbero,
                parteLocal: total - parteBarbero
              };
            });

            return (
              <div key={r.id} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h2>{r.nombre}</h2>
                <p><strong>Total semana:</strong> ${r.totalGeneral.toFixed(2)}</p>

                {/* Controles */}
                <div className="controls" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <label>
                    Porcentaje:
                    <select
                      value={selectedShare}
                      onChange={e => setSelectedShare(Number(e.target.value))}
                      style={{ marginLeft: '0.5rem' }}
                    >
                      <option value={45}>45%</option>
                      <option value={50}>50%</option>
                      <option value={55}>55%</option>
                      <option value={60}>60%</option>
                      <option value={65}>65%</option>
                      <option value={70}>70%</option>
                    </select>
                  </label>

                  <label>
                    Día 100%:
                    <select
                      value={selectedDay100 || ""}
                      onChange={e => setSelectedDay100(e.target.value || null)}
                      style={{ marginLeft: '0.5rem' }}
                    >
                      <option value="">(ninguno)</option>
                      {Object.keys(r.totalesPorDia).map(fecha => (
                        <option key={fecha} value={fecha}>
                          {fecha}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* Botón para abrir historial */}
                <button
                  onClick={() => setShowHistorial(true)}
                  style={{ margin: '1rem 0', padding: '0.5rem 1rem', cursor: 'pointer' }}
                >
                  Ver Historial de Cortes
                </button>

                {/* Modal de Historial de Cortes */}
                {showHistorial && (
                  <HistorialCortesModal
                    cortes={cortes.filter(c => c.employee_id === r.id)}
                    onClose={() => setShowHistorial(false)}
                  />
                )}

                {/* Resultados por día */}
                <div>
                  {resultados.map(d => (
                    <div
                      key={d.fecha}
                      style={{
                        padding: '0.5rem',
                        backgroundColor: d.fecha === selectedDay100 ? '#f0f8ff' : 'transparent',
                        borderRadius: '4px',
                        marginBottom: '0.25rem'
                      }}
                    >
                      <strong>{d.fecha}</strong>: Barbero ${d.parteBarbero.toFixed(2)} – Local ${d.parteLocal.toFixed(2)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
      ) : (
        <p>Seleccioná un barbero para ver su resumen.</p>
      )}
    </div>
  );
}