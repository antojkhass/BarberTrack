// App.jsx
import { useState, useEffect } from "react";
import { Sidebar, CorteForm, AdelantoModal, HistorialAdelantos, InventarioProductos, ModalAgregarProducto, ModalEliminarProducto, ModalEditarProducto, VentasProductos, ResumenBarberos } from './components/index.js';
import { postAdvance, fetchServiceSales } from '../src/api.js';


function App() {
  const [vista, setVista] = useState("corte");
  const [modalVisible, setModalVisible] = useState(false);
  const [mostrarModalProducto, setMostrarModalProducto] = useState(false);
  const [productos, setProductos] = useState([]);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [recargarAdelantos, setRecargarAdelantos] = useState(false);
  const [barberoSeleccionado, setBarberoSeleccionado] = useState(null);
  const [cortes, setCortes] = useState([]);



  const recargarCortes = async () => {
  const data = await fetchServiceSales();
  setCortes(data);
};

useEffect(() => {
  recargarCortes();
}, []);

  const handleVistaChange = (nuevaVista) => {
    if (nuevaVista === "adelanto") {
      setModalVisible(true);
    } else {
      setVista(nuevaVista);
    }
  };

  const handleAgregarProducto = (nuevoProducto) => {
    setProductos((prev) => [...prev, nuevoProducto]);
    setMostrarModalProducto(false);
  };

  const handleEliminarProducto = (idProducto) => {
    setProductos(prev => prev.filter(p => p.id !== parseInt(idProducto)));
  };

  const handleEditarProducto = (productoEditado) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === productoEditado.id ? productoEditado : p))
    );
    setMostrarModalEditar(false);
  };

  return (
    <div className="app-container">
      <Sidebar onSelect={handleVistaChange} vistaActual={vista} />

      <div className="main-content">
        {vista === "corte" && (
  <>
    {/* 1) El formulario */}
    <CorteForm
      barbero={barberoSeleccionado}
      onBarberoChange={setBarberoSeleccionado}
      onNuevoCorte={recargarCortes}
    />

    {/* 2) Justo debajo, el componente que muestra los cortes */}
    {barberoSeleccionado && (
      <CortesPorBarbero
        cortes={cortes}
        barberoId={barberoSeleccionado}
      />
    )}
  </>
)}

        {vista === "historial" && (
          <div className="container">
          <HistorialAdelantos recargar={recargarAdelantos}/>
          </div>
        )}

        {vista === "inventario" && (
          <div className="container">
            <InventarioProductos setMostrarModalProducto={setMostrarModalProducto} setMostrarModalEliminar={setMostrarModalEliminar} setMostrarModalEditar={setMostrarModalEditar} />
          </div>
        )}

        {vista === "ventas" && (
          <div className="container">
            <VentasProductos productos={productos} setProductos={setProductos} />
          </div>
        )}

        {vista === "resumen" && (
          <div className="container">
            <ResumenBarberos />
          </div>
        )}


        {mostrarModalProducto && (
            <ModalAgregarProducto
            visible={mostrarModalProducto}
            onClose={() => setMostrarModalProducto(false)}
            onAgregar={handleAgregarProducto}
              />
        )}

        {mostrarModalEliminar && (
            <ModalEliminarProducto
            visible={mostrarModalEliminar}
            onClose={() => setMostrarModalEliminar(false)}
            productos={productos}
            onEliminar={handleEliminarProducto}
                />
        )}

        {mostrarModalEditar && (
            <ModalEditarProducto
            visible={mostrarModalEditar}
            onClose={() => setMostrarModalEditar(false)}
            onEditar={handleEditarProducto}
            productos={productos}
                />
        )}
    

      </div>

      {modalVisible && (
        <AdelantoModal
          onClose={() => setModalVisible(false)}
          onGuardar={async (adelanto) => {
            try {
            await postAdvance(adelanto)
            setRecargarAdelantos((prev) => !prev);

            console.log("Adelanto guardado:", adelanto);
          } catch (error){
            alert("Error al guardar el adelanto.");
            console.error(error);
          }}
          }
        />
      )}

    </div>
  );
}

export default App;

