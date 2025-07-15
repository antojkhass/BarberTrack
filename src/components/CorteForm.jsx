import { useState, useEffect } from 'react';
import {
  fetchEmployees,
  fetchService,
  fetchSaleStatus,
  postServiceSale,
  fetchServiceSales,
  deleteServiceSale,
  updateServiceSale
} from '../api';
import { CortesPorBarbero } from './CortesPorBarbero';
import { EditCorteModal } from './EditCorteModal';
import Swal from 'sweetalert2';
import "./AdelantoModal.css";


export function CorteForm() {
  const [barberos, setBarberos] = useState([]);
  const [cortes, setCortes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [estadosVenta, setEstadosVenta] = useState([]);
  const [editingCorte, setEditingCorte] = useState(null);
  const [specialPrice, setSpecialPrice ] = useState ('');

  // Carga inicial de datos
  useEffect(() => {
    fetchEmployees().then(setBarberos);
    fetchServiceSales().then(setCortes);
    fetchService().then(setServicios);
    fetchSaleStatus().then(setEstadosVenta);
  }, []);

  // Handlers para editar y eliminar
  const handleEdit = corte => {
    setEditingCorte(corte);
  };

    // Este es el onSave que recibe el modal:
  async function handleSave(updated) {

    await updateServiceSale(updated.id, updated.estado_id);


    const fresh = await fetchServiceSales();
    setCortes(fresh);

    setEditingCorte(null);
  }
  const handleDelete = async id => {
    await deleteServiceSale(id);
       try {
+     await deleteServiceSale(id);
        Swal.fire({
       icon: 'success',
       title: '¡Eliminado!',
       text: 'El corte se eliminó correctamente.',
       timer: 1500,
       showConfirmButton: false
     });
     // recargo la lista
     const fresh = await fetchServiceSales();
     setCortes(fresh);
   } catch {
     Swal.fire('Error', 'No se pudo eliminar el corte.', 'error');
   }
  };

  // Campos del formulario
  const [barbero, setBarbero] = useState('');
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [estadoVentaSeleccionado, setEstadoVentaSeleccionado] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [propina, setPropina] = useState('');

  // Barbero seleccionado para ver cortes
  const [selectedBarberoId, setSelectedBarberoId] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    // const precio = servicios.find(s => s.id === servicioSeleccionado)?.price ?? 0;
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    const fechaLocal = `${yyyy}-${mm}-${dd}`;
    const servicioObj = servicios.find(s => s.id === servicioSeleccionado);
    const isEspecial = servicioObj?.name === 'Especial';

      const precioFinal = isEspecial
     ? Number(specialPrice)
     : servicioObj?.price ?? 0;

    const nuevoCorte = {
      employee_id: barbero,
      service_id: servicioSeleccionado,
      estado_id: estadoVentaSeleccionado,
      // total: precio,
      total: precioFinal,
      paymentMethod: metodoPago,
      propina: Number(propina),
      fecha: fechaLocal,
    };
    
    // Obtengo nombres para mostrar en el diálogo
    const nombreBarbero = barberos.find(b => b.id === barbero)?.nombre || ''
    const nombreServicio = servicios.find(s => s.id === servicioSeleccionado)?.name || ''

    Swal.fire({
      title: '¿Confirmar Registro?',
      icon: 'question',
      html: `
        <p><strong>Barbero:</strong> ${nombreBarbero}</p>
        <p><strong>Servicio:</strong> ${nombreServicio}</p>
        <p><strong>Método de Pago:</strong> ${metodoPago}</p>
        <p><strong>Propina:</strong> ${propina}</p>
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
       buttonsStyling: false, // desactiva estilos por defecto
        customClass: {
          confirmButton: 'swal-confirm-btn',
          cancelButton: 'swal-cancel-btn'
          }
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await postServiceSale(nuevoCorte)
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Corte registrado correctamente.',
            timer: 1500,
            showConfirmButton: false
          })
          // recargo cortes y limpio form
          const fresh = await fetchServiceSales()
          setCortes(fresh)
          setBarbero('')
          setServicioSeleccionado('')
          setSpecialPrice('') 
          setEstadoVentaSeleccionado('')
          setMetodoPago('')
          setPropina('')
        } catch {
          Swal.fire('Error', 'No se pudo registrar el corte.', 'error')
        }
      }
    })
  }


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

              {/* --- Campo de precio especial si el servicio es "Especial" --- */}
       {servicios.find(s => s.id === servicioSeleccionado)?.name === 'Especial' && (
         <>
           <label>Especial</label>
           <input
             type="number"
             value={specialPrice}
             onChange={e => setSpecialPrice(e.target.value)}
             min="0"
             step="0.01"
             placeholder="Ingrese precio"
             required
           />
         </>
         )}

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

      {/* Aquí mostramos los cortes agrupados por fecha */}
      {selectedBarberoId && (
        <>
          <CortesPorBarbero
            cortes={cortes}
            barberoId={selectedBarberoId}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSave={handleSave}
          />
          {editingCorte && (
            <EditCorteModal
              corte={editingCorte}
              servicios={servicios}
              estadosVenta={estadosVenta}
              onSave={async updated => {
                await updateServiceSale(updated.id, updated);
                  Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Corte actualizado correctamente.',
                timer: 1500,
                showConfirmButton: false
                  });
                const fresh = await fetchServiceSales();
                setCortes(fresh);
                setEditingCorte(null);
              }}
              onClose={() => setEditingCorte(null)}
            />
          )}
        </>
      )}
    </div>
  );
}
