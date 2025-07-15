// src/components/CortesPorBarbero.jsx
import { useState } from 'react';
import Swal from 'sweetalert2';
import "./AdelantoModal.css";

export function CortesPorBarbero({ cortes, barberoId, onEdit, onDelete }) {
  // ——— 1. Calcular Lunes y Domingo de la semana actual ———
  const hoy = new Date();
  const diaSemana = hoy.getDay();   // 0=domingo, 1=lunes…
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() - (diaSemana === 0 ? 6 : diaSemana - 1));
  lunes.setHours(0, 0, 0, 0);
  const domingo = new Date(lunes);
  domingo.setDate(lunes.getDate() + 6);
  domingo.setHours(23, 59, 59, 999);

  // estado para expandir/colapsar por fecha
  const [openDates, setOpenDates] = useState({});
  const toggle = fecha => {
    setOpenDates(prev => ({
      ...prev,
      [fecha]: !prev[fecha]
    }));
  };

  // ——— 2. Filtrar SOLO de este barbero y dentro de ese rango ———
  const sus = cortes.filter(c => {
    if (c.employee_id !== barberoId) return false;
    const fechaCorte = new Date(c.fecha + 'T00:00:00');
    return fechaCorte >= lunes && fechaCorte <= domingo;
  });

  if (!sus.length) {
    return <p>No hay cortes esta semana.</p>;
  }

  // ——— 3. Agrupar por fecha ———
  const porFecha = sus.reduce((acc, c) => {
    acc[c.fecha] = acc[c.fecha] || [];
    acc[c.fecha].push(c);
    return acc;
  }, {});

  // helper para formatear sin .00 si es entero
  function formato(n) {
    return Number.isInteger(n) ? n : n.toFixed(2);
  }

  return (
    <>
      {Object.entries(porFecha).map(([fecha, lista]) => {
        // convertir totales a número
        const items = lista.map(c => ({
          ...c,
          total: Number(c.total),
          propina: Number(c.propina || 0)
        }));

        // nombre del día (“Lunes”, “Martes”…)
        const dateObj = new Date(fecha + 'T00:00:00');
        const nombreDia = dateObj
          .toLocaleDateString('es-ES', { weekday: 'long' })
          .replace(/^./, str => str.toUpperCase());

        const abierto = !!openDates[fecha];

        // calcular totales del día
        const totalDia = items.reduce((sum, c) => sum + c.total, 0);
        const totalEfectivo = items
          .filter(c => c.paymentMethod === 'Efectivo')
          .reduce((sum, c) => sum + c.total, 0);
        const totalOtros = totalDia - totalEfectivo;
        const propinasDia = items.reduce((sum, c) => sum + c.propina, 0);
        const parteBarbero = totalDia * 0.55;
        const parteLocal = totalDia - parteBarbero;

        return (
          <div
            key={fecha}
            style={{
              marginBottom: '1rem',
              padding: '1rem',
              background: '#f1f1f1',
              borderRadius: 6
            }}
          >
            {/* Header del día + toggle */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h3 style={{ flex: 1, fontSize: '1.25rem' }}>{nombreDia}</h3>
              <button onClick={() => toggle(fecha)}>
                {abierto ? 'Ocultar detalles' : 'Mostrar detalles'}
              </button>
            </div>

            {abierto && (
              <>
                {/* Totales del día */}
                <div style={{ margin: '1rem 0' }}>
                  <div><strong>Efectivo:</strong> ${formato(totalEfectivo)}</div>
                  <div><strong>Otros Métodos:</strong> ${formato(totalOtros)}</div>
                  <div><strong>Total del Día:</strong> ${formato(totalDia)}</div>
                  <div><strong>Porcentaje del Barbero:</strong> ${formato(parteBarbero)}</div>
                  <div><strong>Porcentaje del Local:</strong> ${formato(parteLocal)}</div>
                  <div><strong>Propinas del Día:</strong> ${formato(propinasDia)}</div>
                </div>

                 <hr style={{ margin: '1rem 0', borderColor: '#ddd' }} />

                {/* Listado de cortes con botones */}
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
                  {lista.map((c, idx) => (
                    <li key={c.id} style={{ marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ margin: 0 }}>Corte {idx + 1}</h4>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {/* Editar */}
                          <button
                            onClick={() => onEdit(c)}
                            style={{
                              padding: '0.3rem 0.6rem',
                              fontSize: '0.9rem',
                              cursor: 'pointer'
                            }}
                          >
                            Editar
                          </button>
                          {/* Eliminar */}
                          <button className='btn-eliminar'
                            onClick={() => {
                              Swal.fire({
                                title: '¿Estás seguro?',
                                text: 'Este corte se eliminará permanentemente.',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Sí, eliminar',
                                cancelButtonText: 'Cancelar'
                              }).then(result => {
                                if (result.isConfirmed) {
                                  onDelete(c.id);
                                }
                              });
                            }}
                            // style={{
                            //   padding: '0.3rem 0.6rem',
                            //   fontSize: '0.9rem',
                            //   background: '#e74c3c',
                            //   color: 'white',
                            //   border: 'none',
                            //   cursor: 'pointer'
                              
                            // }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>

                      {/* Detalles del corte */}
                      <div>Hora de Registro: {new Date(c.createdAt).toLocaleTimeString()}</div>
                      <div>Monto: ${formato(c.total)}</div>
                      <div>Servicio: {c.service.name}</div>
                      <div>Estado: <span className={c.estadoVenta?.estado === 'Pendiente' ? 'estado-pendiente' : ''}> {c.estadoVenta?.estado || ''} </span> </div>
                      <div>Método de Pago: <span className={c.paymentMethod !== 'Efectivo' ? 'metodo-destacado' : ''}>{c.paymentMethod}</span></div> 
                      <div>Propina: ${formato(c.propina)}</div>

                      <hr style={{ margin: '1rem 0', borderColor: '#ddd' }} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}


// si luego pongo un porcentaje dinámico, uso este código para usar props; aquí uso 55%
// const share = props.sharePercentage ?? 55;
// const parteBarbero = totalDia * (share / 100);
