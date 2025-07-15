import "./Sidebar.css";

export function Sidebar({ onSelect, vistaActual }) {
  const botones = [
    { clave: "corte", texto: "Registrar Corte" },
    { clave: "adelanto", texto: "Registrar Adelanto" },
    { clave: "historial", texto: "Historial de Adelantos" },
    { clave: "inventario", texto: "Inventario de Productos" },
    { clave: "ventas", texto: "Ventas de Productos" },
    { clave: "resumen", texto: "Resumen de Barberos" }
  ];

  return (
 <div className="sidebar">
  <div className="sidebar-buttons">
    {botones
      .filter((boton) => boton.clave !== "resumen")
      .map((boton) => (
        <button
          key={boton.clave}
          onClick={() => onSelect(boton.clave)}
          className={vistaActual === boton.clave ? "active" : ""}
        >
          {boton.texto}
        </button>
      ))}
  </div>

  <div className="sidebar-bottom">
    <button
      onClick={() => onSelect("resumen")}
      className={vistaActual === "resumen" ? "active" : ""}
    >
      Gestion de Caja
    </button>
  </div>
  </div>
  );
}

// export default Sidebar;
