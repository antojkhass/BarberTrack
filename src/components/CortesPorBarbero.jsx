import { useState } from 'react'

export function CortesPorBarbero({ cortes, barberoId }) {
  // ——— 1. Calcular Lunes y Domingo de la semana actual ———
  const hoy = new Date()
  const diaSemana = hoy.getDay()   
  const lunes = new Date(hoy)
  lunes.setDate(hoy.getDate() - (diaSemana === 0 ? 6 : diaSemana - 1))
  lunes.setHours(0, 0, 0, 0)
  const domingo = new Date(lunes)
  domingo.setDate(lunes.getDate() + 6)
  domingo.setHours(23, 59, 59, 999)

  const [openDates, setOpenDates] = useState({})

  const toggle = fecha => {
    setOpenDates(prev => ({
      ...prev,
      [fecha]: !prev[fecha]
    }))
  }

  // ——— 2. Filtrar SOLO de este barbero y dentro de ese rango ———
  const sus = cortes.filter(c => {
    if (c.employee_id !== barberoId) return false
    const fechaCorte = new Date(c.fecha + 'T00:00:00')
    return fechaCorte >= lunes && fechaCorte <= domingo
  })

  if (!sus.length) {
    return <p>No hay cortes esta semana.</p>
  }

  // ——— 3. Agrupar por fecha ———
  const porFecha = sus.reduce((acc, c) => {
    acc[c.fecha] = acc[c.fecha] || []
    acc[c.fecha].push(c)
    return acc
  }, {})

  return (
    <>
      {Object.entries(porFecha).map(([fecha, lista]) => {
        // ——— Convertir "YYYY-MM-DD" a nombre del día de la semana ———
        const dateObj = new Date(fecha + 'T00:00:00')
        let nombreDia = dateObj.toLocaleDateString('es-ES', { weekday: 'long' })
        nombreDia = nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1)

        const abierto = !!openDates[fecha]

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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <strong style={{ flex: 1 }}>
                {nombreDia} {/* si quieres también la fecha: `${nombreDia} — ${fecha}` */}
              </strong>
              <button onClick={() => toggle(fecha)}>
                {abierto ? 'Ocultar detalles' : 'Mostrar detalles'}
              </button>
            </div>
            <div className='container-detalles-cortes'>
            {abierto && (
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
                {lista.map((c, idx) => (
                  <li key={c.id} style={{ marginBottom: '0.5rem' }}>
                    <strong>Corte {idx + 1}</strong>
                    <div>Hora de Registro: {new Date(c.createdAt).toLocaleTimeString()}</div>
                    <div>Monto: ${c.total}</div>
                    <div>Servicio: {c.service.name}</div>
                          <div>Estado: {c.estadoVenta?.estado || '–'}</div>
      <div>Método de Pago: {c.paymentMethod}</div>
                    <div>Propina: ${c.propina}</div>
                  </li>
                ))}
              </ul>
            )}
            </div>
          </div>
        )
      })}
    </>
  )
}
