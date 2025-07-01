
import "./AdelantoModal.css";

export function HistorialCortesModal({ cortes, onClose }) {
  // Verifica en consola la estructura real de cada corte
  console.log("Cortes en el modal:", cortes);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Historial de Cortes</h2>

        {cortes.length > 0 ? (
          <ul className="cortes-list">
            {cortes.map(corte => {
              // Usamos 'total' en lugar de 'monto'
              const monto = corte.total ?? 0;

              return (
                <li key={corte.id} className="corte-item">
                  {/* <p><strong>ID:</strong> {corte.id}</p> */}
                  <p><strong>Fecha y hora:</strong> {new Date(corte.createdAt).toLocaleString()}</p>
                  <p><strong>Total:</strong> ${monto.toFixed(2)}</p>
                  {/* Servicio y precio desde la relación 'service' */}
                  <p><strong>Servicio:</strong> {corte.service?.name || "-"}</p>
                  <p><strong>Precio de Servicio:</strong> ${(corte.service?.price ?? 0).toFixed(2)}</p>
                  {/* Estado de la venta */}
                  <p><strong>Estado:</strong> {corte.estadoVenta?.estado || "-"}</p>
                  {/* <p><strong>Propina:</strong> {corte.estadoVenta?.estado || "-"}</p> */}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No hay cortes registrados para este barbero.</p>
        )}
      </div>
    </div>
  );
}
