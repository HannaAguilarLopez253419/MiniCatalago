// Capa de datos compartida (catálogo + admin). Por ahora usa localStorage con datos de prueba.
// Cuando haya backend, solo cambia lo que hay DENTRO de estas funciones.
const CLAVE_PRODUCTOS = 'mc_productos';
const CLAVE_PEDIDOS = 'mc_pedidos';
const NEGOCIO = { nombre: 'Café La Esquina', whatsapp: '5219610000000' }; // cambia el número (52 + 10 dígitos)

const PRODUCTOS_DEMO = [
  { id: 1, nombre: 'Hamburguesa clásica', precio: 95, categoria: 'Comida', descripcion: 'Carne de res, queso, lechuga y jitomate con papas.', imagen: 'img/productos/hamburguesa.svg', enOferta: false, precioOferta: null },
  { id: 2, nombre: 'Tacos de pastor', precio: 70, categoria: 'Comida', descripcion: 'Orden de 4 tacos con piña, cebolla y cilantro.', imagen: 'img/productos/tacos.svg', enOferta: true, precioOferta: 59 },
  { id: 3, nombre: 'Torta de jamón', precio: 55, categoria: 'Comida', descripcion: 'Pan telera con jamón, aguacate y frijoles.', imagen: 'img/productos/torta.svg', enOferta: false, precioOferta: null },
  { id: 4, nombre: 'Pastel de chocolate', precio: 48, categoria: 'Postres', descripcion: 'Rebanada húmeda con cobertura de ganache.', imagen: 'img/productos/pastel.svg', enOferta: false, precioOferta: null },
  { id: 5, nombre: 'Flan napolitano', precio: 35, categoria: 'Postres', descripcion: 'Flan casero con caramelo.', imagen: 'img/productos/flan.svg', enOferta: true, precioOferta: 29 },
  { id: 6, nombre: 'Galletas de avena', precio: 28, categoria: 'Postres', descripcion: 'Bolsa con 3 galletas con pasas.', imagen: 'img/productos/galletas.svg', enOferta: false, precioOferta: null },
  { id: 7, nombre: 'Café americano', precio: 32, categoria: 'Bebidas', descripcion: 'Café de Chiapas, 12 oz, caliente o frío.', imagen: 'img/productos/cafe.svg', enOferta: false, precioOferta: null },
  { id: 8, nombre: 'Limonada con chía', precio: 38, categoria: 'Bebidas', descripcion: 'Limonada natural de 16 oz con chía.', imagen: 'img/productos/limonada.svg', enOferta: false, precioOferta: null },
  { id: 9, nombre: 'Malteada de fresa', precio: 58, categoria: 'Bebidas', descripcion: 'Fresas naturales, leche y helado de vainilla.', imagen: 'img/productos/malteada.svg', enOferta: false, precioOferta: null },
  { id: 10, nombre: 'Papas con queso', precio: 45, categoria: 'Snacks', descripcion: 'Papas a la francesa con salsa de queso.', imagen: 'img/productos/papas.svg', enOferta: false, precioOferta: null }
];

function leer(clave) { try { return JSON.parse(localStorage.getItem(clave)); } catch (e) { return null; } }

function obtenerProductos() {
  const guardados = leer(CLAVE_PRODUCTOS);
  if (Array.isArray(guardados) && guardados.length) return guardados;
  guardarProductos(PRODUCTOS_DEMO);
  return PRODUCTOS_DEMO;
}
function guardarProductos(lista) { localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(lista)); }
function obtenerPedidos() { return leer(CLAVE_PEDIDOS) || []; }
function guardarPedido(pedido) {
  const lista = obtenerPedidos();
  lista.unshift(pedido);
  localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(lista));
}