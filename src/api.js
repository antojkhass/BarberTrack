const BASE_URL = "http://localhost:8080/api";

// Endpoints
export const EMPLOYEES_API_URL = `${BASE_URL}/employees`;
export const PRODUCTS_API_URL = `${BASE_URL}/products`;
export const PRODUCT_SALES_API_URL = `${BASE_URL}/productSale`;
export const ADVANCES_API_URL = `${BASE_URL}/advances`;
export const SERVICE_API_URL = `${BASE_URL}/services`;
export const SALE_STATUS_API_URL  = `${BASE_URL}/saleStatus`;
export const SERVICE_SALES_API_URL = `${BASE_URL}/serviceSale`;

// ---------- EMPLOYEES ----------
export async function fetchEmployees() {
  try {
    const res = await fetch(EMPLOYEES_API_URL);
    if (!res.ok) throw new Error("Error al obtener barberos");
    return await res.json();
  } catch (error) {
    console.error("Error al obtener barberos:", error);
    return [];
  }
}

export async function postEmployee(barbero) {
  try {
    const res = await fetch(EMPLOYEES_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(barbero),
    });
    return await res.json();
  } catch (error) {
    console.error("Error al crear el barbero:", error);
    throw error;
  }
}

export async function deleteEmployee(id) {
  try {
    await fetch(`${EMPLOYEES_API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error al eliminar el barbero:", error);
  }
}

export async function updateEmployees(id, datosActualizados) {
  try {
    const res = await fetch(`${EMPLOYEES_API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosActualizados),
    });
    if (!res.ok) throw new Error("Error al actualizar el barbero");
    return await res.json();
  } catch (error) {
    console.error("Error al actualizar el barbero:", error);
    throw error;
  }
}


// ---------- PRODUCTS ----------
export async function fetchProducts() {
  try {
    const res = await fetch(PRODUCTS_API_URL);
    if (!res.ok) throw new Error("Error al obtener productos");
    return await res.json();
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

export async function postProduct(producto) {
  try {
    const res = await fetch(PRODUCTS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    return await res.json();
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    await fetch(`${PRODUCTS_API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
}

export async function updateProduct(id, datosActualizados) {
  try {
    const res = await fetch(`${PRODUCTS_API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosActualizados),
    });
    if (!res.ok) throw new Error("Error al actualizar producto");
    return await res.json();
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
}


// ---------- ADVANCES ----------
export async function fetchAdvances() {
  try {
    const res = await fetch(ADVANCES_API_URL);
    if (!res.ok) throw new Error("Error al obtener adelantos");
    return await res.json();
  } catch (error) {
    console.error("Error al obtener adelantos:", error);
    return [];
  }
}

export async function postAdvance(adelanto) {
  try {
    const res = await fetch(ADVANCES_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adelanto),
    });
    return await res.json();
  } catch (error) {
    console.error("Error al crear adelanto:", error);
    throw error;
  }
}

export async function deleteAdvance(id) {
  try {
    await fetch(`${ADVANCES_API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error al eliminar adelanto:", error);
  }
}

// ---------- PRODUCT SALES ----------
export async function fetchSales() {
  try {
    const res = await fetch(PRODUCT_SALES_API_URL);
    if (!res.ok) throw new Error("Error al obtener ventas");
    return await res.json();
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    return [];
  }
}

export async function postSale(sale) {
  try {
    const res = await fetch(PRODUCT_SALES_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sale),
    });
    return await res.json();
  } catch (error) {
    console.error("Error al registrar venta:", error);
    throw error;
  }
}

export async function deleteSale(id) {
  try {
    await fetch(`${PRODUCT_SALES_API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error al eliminar venta:", error);
  }
}

export async function updateSaleStatusOfProductSale(saleId, estado_id) {
  try {
    const res = await fetch(`${PRODUCT_SALES_API_URL}/${saleId}/estado`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado_id }),
    });

    if (!res.ok) throw new Error("Error al cambiar el estado de la venta");
    return await res.json();
  } catch (error) {
    console.error("Error al cambiar el estado de la venta:", error);
    throw error;
  }
}



// ---------- SERVICES ----------

export async function fetchServiceSales() {
  try {
    const res = await fetch(SERVICE_SALES_API_URL);
    if (!res.ok) throw new Error("Error al obtener cortes");
    return await res.json();
  } catch (error) {
    console.error("Error al obtener cortes:", error);
    return [];
  }
}



export async function fetchService() {
  try {
    const res = await fetch(SERVICE_API_URL);
    if (!res.ok) throw new Error("Error al obtener los servicios");
    return await res.json();
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    return [];
  }
}

export async function postService(service) {
  try {
    const res = await fetch(SERVICE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    });
    return await res.json();
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    throw error;
  }
}

export async function deleteService(id) {
  try {
    await fetch(`${SERVICE_API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error al eliminar el servicio:", error);
  }
}

export async function updateService(id, datosActualizados) {
  try {
    const res = await fetch(`${SERVICE_API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosActualizados),
    });
    if (!res.ok) throw new Error("Error al actualizar el servicio");
    return await res.json();
  } catch (error) {
    console.error("Error al actualizar el servicio:", error);
    throw error;
  }
}


// ---------- SALES STATUS ----------

export async function fetchSaleStatus() {
  try {
    const res = await fetch(SALE_STATUS_API_URL);
    if (!res.ok) throw new Error("Error al obtener estados de venta");
    return await res.json();
  } catch (error) {
    console.error("Error al obtener estados de venta:", error);
    return [];
  }
}


export async function postSaleStatus(data) {
  try {
    const res = await fetch(SALE_STATUS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error("Error al crear estado de venta:", error);
    throw error;
  }
}


export async function deleteSaleStatus(id) {
  try {
    await fetch(`${SALE_STATUS_API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error al eliminar estado de venta:", error);
  }
}

// ---------- SERVICE SALES ----------
export async function postServiceSale(corte) {
  try {
    const res = await fetch(SERVICE_SALES_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corte),
    });
    if (!res.ok) throw new Error("Error al registrar corte");
    return await res.json();
  } catch (error) {
    console.error("Error al crear corte:", error);
    throw error;
  }
}

