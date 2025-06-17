// App.jsx
import { useState } from "react";
import { Sidebar, CorteForm, AdelantoModal, HistorialAdelantos, InventarioProductos, ModalAgregarProducto, ModalEliminarProducto, ModalEditarProducto, VentasProductos, ResumenBarberos } from './components/index.js';
import {postAdvance} from '../src/api.js'


function App() {
  const [vista, setVista] = useState("corte");
  const [modalVisible, setModalVisible] = useState(false);
  const [mostrarModalProducto, setMostrarModalProducto] = useState(false);
  const [productos, setProductos] = useState([]);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

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
        {vista === "corte" && <CorteForm />}

        {vista === "historial" && (
          <div className="container">
          <HistorialAdelantos />
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
          onGuardar={async(adelanto) => {
            try {
            await postAdvance(adelanto)
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

