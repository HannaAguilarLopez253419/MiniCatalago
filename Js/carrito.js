/* carrito.js – Lógica del carrito y los pedidos (sin tocar el DOM,
   salvo el contador del navbar). Cargar después de utils.js.

   Uso desde catalogo.html:
   Carrito.agregar({ id, nombre, precio, img });
*/

const Carrito = {

    obtener() {
        return leer(CLAVES.carrito, []);
    },

    total() {
        return Carrito.obtener().reduce((suma, i) => suma + i.precio * i.cantidad, 0);
    },

    cantidadTotal() {
        return Carrito.obtener().reduce((suma, i) => suma + i.cantidad, 0);
    },

    agregar(producto) {
        const items = Carrito.obtener();
        const existente = items.find(i => i.id === producto.id);

        if (existente) {
            existente.cantidad++;
        } else {
            items.push({ ...producto, cantidad: 1 });
        }
        guardar(CLAVES.carrito, items);
        Carrito.actualizarContador();
    },

    cambiarCantidad(id, cambio) {
        const items = Carrito.obtener();
        const item = items.find(i => i.id === id);
        if (item) item.cantidad += cambio;

        guardar(CLAVES.carrito, items.filter(i => i.cantidad > 0));
        Carrito.actualizarContador();
    },

    quitar(id) {
        guardar(CLAVES.carrito, Carrito.obtener().filter(i => i.id !== id));
        Carrito.actualizarContador();
    },

    vaciar() {
        guardar(CLAVES.carrito, []);
        Carrito.actualizarContador();
    },

    actualizarContador() {
        const contador = $("cartCount");
        if (contador) contador.textContent = Carrito.cantidadTotal();
    }
};

const Pedidos = {

    // Guarda el pedido (el panel admin puede leerlo en localStorage "mc_pedidos")
    crear(cliente, notas) {
        const pedido = {
            id: Date.now(),
            fecha: new Date().toISOString(),
            cliente,
            notas,
            items: Carrito.obtener(),
            total: Carrito.total(),
            estado: "Nuevo"
        };
        const pedidos = leer(CLAVES.pedidos, []);
        pedidos.unshift(pedido);
        guardar(CLAVES.pedidos, pedidos);
        return pedido;
    },

    armarMensaje(pedido) {
        const lineas = pedido.items
            .map(i => `• ${i.cantidad} x ${i.nombre} – ${mxn(i.precio * i.cantidad)}`)
            .join("\n");

        let mensaje = `Hola, soy ${pedido.cliente}. Quiero hacer este pedido:\n${lineas}\n\nTotal: ${mxn(pedido.total)}`;
        if (pedido.notas) mensaje += `\nNotas: ${pedido.notas}`;
        return mensaje;
    },

    enviarPorWhatsApp(pedido) {
        const url = `https://wa.me/${NEGOCIO_WHATSAPP}?text=${encodeURIComponent(Pedidos.armarMensaje(pedido))}`;
        window.open(url, "_blank");
    }
};

const MC = Carrito; // alias para no romper llamadas anteriores: MC.agregar(...)

document.addEventListener("DOMContentLoaded", Carrito.actualizarContador);