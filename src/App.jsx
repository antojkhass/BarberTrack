// App.jsx
import { useState, useEffect } from "react";
import {
  Sidebar,
  CorteForm,
  AdelantoModal,
  HistorialAdelantos,
  InventarioProductos,
  ModalAgregarProducto,
  ModalEliminarProducto,
  ModalEditarProducto,
  VentasProductos,
  ResumenBarberos
} from './components/index.js';
import { postAdvance, fetchServiceSales, postProduct, deleteProduct, updateProduct, fetchProducts  } from '../src/api.js';
import Swal from "sweetalert2";

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
  const [, setProductoSeleccionado] = useState(null);


  const recargarCortes = async () => {
    const data = await fetchServiceSales();
    setCortes(data);
  };

  useEffect(() => {
    recargarCortes();
  }, []);

  const cargarProductos = async () => {
  try {
    const productosDesdeDB = await fetchProducts();
    setProductos(productosDesdeDB);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

useEffect(() => {
  cargarProductos();
}, []);

  const handleVistaChange = (nuevaVista) => {
    if (nuevaVista === "adelanto") {
      setModalVisible(true);
    } else {
      setVista(nuevaVista);
    }
  };

  const agregarProducto = async (nuevoProducto) => {
    try {
      const productoGuardado = await postProduct(nuevoProducto);
      setProductos((prev) => [...prev, productoGuardado]);
        Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: "El producto fue agregado correctamente",
      timer: 2000,
      showConfirmButton: false,
    });
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert("Error al guardar producto");
    }
  };

const handleEliminarProducto = async (idProducto) => {
  try {
    await deleteProduct(idProducto);
    setProductos(prev => prev.filter(p => p.id !== parseInt(idProducto))); 
       Swal.fire({
      icon: "success",
      title: "Producto eliminado",
      text: "El producto fue eliminado correctamente",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    alert("No se pudo eliminar el producto.");
  }
};


const handleEditarProducto = async (productoEditado) => {
  try {
    await updateProduct(productoEditado.id, productoEditado);
    await cargarProductos(); // Esto ya actualiza todo desde la DB
    setMostrarModalEditar(false);
       Swal.fire({
      icon: "success",
      title: "Producto editado",
      text: "El producto fue editado correctamente",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error("Error al editar producto:", error);
    alert("No se pudo editar el producto.");
  }
};

  return (
    <div className="app-container">
      <Sidebar onSelect={handleVistaChange} vistaActual={vista} />

      <div className="main-content">
        {vista === "corte" && (
          <>
            <CorteForm
              barbero={barberoSeleccionado}
              onBarberoChange={setBarberoSeleccionado}
              onNuevoCorte={recargarCortes}
            />
            {barberoSeleccionado && (
              <CortesPorBarbero cortes={cortes} barberoId={barberoSeleccionado} />
            )}
          </>
        )}

        {vista === "historial" && (
          <div className="container">
            <HistorialAdelantos recargar={recargarAdelantos} />
          </div>
        )}

        {vista === "inventario" && (
          <div className="container">
            <InventarioProductos
              productos={productos}
              setProductos={setProductos}
              setMostrarModalEliminar={setMostrarModalEliminar}
              setMostrarModalEditar={setMostrarModalEditar}
              setMostrarModalAgregar={setMostrarModalProducto}
              setProductoSeleccionado={setProductoSeleccionado} 

            />
          </div>
        )}

        {vista === "ventas" && (
          <div className="container">
            
            <VentasProductos 
            productos={productos} 
            setProductos={setProductos} 
            cargarProductos={cargarProductos}
            />
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
            onAgregar={agregarProducto}
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
              await postAdvance(adelanto);
              setRecargarAdelantos((prev) => !prev);
            } catch (error) {
              alert("Error al guardar el adelanto.");
              console.error(error);
            }
          }}
        />
      )}
    </div>
  );
}

export default App;
