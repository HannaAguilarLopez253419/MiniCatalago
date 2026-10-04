/* carrito-vista.js – Pinta y maneja eventos de carrito.html
   Orden de scripts: config.js, utils.js, carrito.js, carrito-vista.js */

// Productos reales del admin; si no hay, datos de ejemplo (mock.js)
function obtenerProductosParaMostrar() {
    if (productos.length > 0) return productos;
    return USAR_MOCK ? PRODUCTOS_MOCK : [];
}

// ---------- Construcción de elementos ----------

function crearBoton(texto, accion, id, etiqueta) {
    const boton = el("button", "", texto);
    boton.dataset.accion = accion;
    boton.dataset.id = id;
    boton.setAttribute("aria-label", etiqueta);
    return boton;
}

function crearFilaPedido(item) {
    const fila = el("div", "item");

    const imagen = item.img ? el("img") : el("div", "ph");
    if (item.img) {
        imagen.src = item.img;
        imagen.alt = "";
    }

    const controles = el("div", "cant");
    controles.append(
        crearBoton("−", "menos", item.id, "Quitar una unidad"),
        el("b", "", String(item.cantidad)),
        crearBoton("+", "mas", item.id, "Agregar una unidad")
    );

    const info = el("div");
    info.append(
        el("h3", "", item.nombre),
        el("small", "", `${mxn(item.precio)} c/u`),
        controles
    );

    const quitar = crearBoton("Quitar", "quitar", item.id, "Quitar del pedido");
    quitar.className = "quitar";

    const derecha = el("div");
    derecha.append(el("div", "precio", mxn(item.precio * item.cantidad)), quitar);

    fila.append(imagen, info, derecha);
    return fila;
}

function crearTarjetaProducto(producto) {
    const tarjeta = el("article", "prod");
    const imagenUrl = producto.imagen || producto.img;

    if (imagenUrl) {
        const imagen = el("img");
        imagen.src = imagenUrl;
        imagen.alt = "";
        tarjeta.append(imagen);
    } else {
        tarjeta.append(el("div", "ph grande", producto.emoji || ""));
    }

    const boton = el("button", "btn", "Agregar al pedido");
    boton.addEventListener("click", () => {
        Carrito.agregar({
            id: String(producto.id ?? producto.nombre),
            nombre: producto.nombre,
            precio: Number(producto.precio),
            img: imagenUrl
        });
        renderPedido();
    });

    if (producto.categoria) tarjeta.append(el("small", "categoria", producto.categoria));

    tarjeta.append(
        el("h3", "", producto.nombre),
        el("div", "precio", mxn(Number(producto.precio))),
        boton
    );
    return tarjeta;
}

// ---------- Render ----------

function renderPedido() {
    const items = Carrito.obtener();

    $("vacio").hidden = items.length > 0;
    $("resumen").hidden = items.length === 0;

    $("lista").replaceChildren(...items.map(crearFilaPedido));
    $("sub").textContent = mxn(Carrito.total());
    $("tot").textContent = mxn(Carrito.total());
}

function renderProductosDisponibles() {
    const lista = obtenerProductosParaMostrar();

    $("sinProductos").hidden = lista.length > 0;
    $("avisoMock").hidden = productos.length > 0 || lista.length === 0;
    $("productos").replaceChildren(...lista.map(crearTarjetaProducto));
}

// ---------- Eventos ----------

function manejarAccionDelPedido(evento) {
    const boton = evento.target.closest("button[data-accion]");
    if (!boton) return;

    const { accion, id } = boton.dataset;
    if (accion === "mas") Carrito.cambiarCantidad(id, 1);
    if (accion === "menos") Carrito.cambiarCantidad(id, -1);
    if (accion === "quitar") Carrito.quitar(id);

    renderPedido();
}

function enviarPedido() {
    const campoNombre = $("nombre");
    const cliente = campoNombre.value.trim();

    if (!cliente) {
        campoNombre.focus();
        alert("Escribe tu nombre para enviar el pedido.");
        return;
    }

    const pedido = Pedidos.crear(cliente, $("notas").value.trim());
    Pedidos.enviarPorWhatsApp(pedido);
    Carrito.vaciar();
    renderPedido();
}

// ---------- Inicio ----------

document.addEventListener("DOMContentLoaded", () => {
    renderPedido();
    renderProductosDisponibles();
    $("lista").addEventListener("click", manejarAccionDelPedido);
    $("btnEnviar").addEventListener("click", enviarPedido);
});