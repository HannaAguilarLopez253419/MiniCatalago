// Misma clave y mismos campos que usa el panel admin (Js/admin.js):
// nombre, precio, imagen, whatsapp, categoria, descripcion.
// Los productos que guarde el admin salen primero; los de prueba se muestran debajo.
const CLAVE_PRODUCTOS = 'productos';
const NEGOCIO = { nombre: '' };
const MOSTRAR_DEMO = true; // true = los productos de prueba salen debajo de los del dueño
const WA = 'https://wa.me/529681176457'; // link del dueño (52 + 10 dígitos)

const PRODUCTOS_DEMO = [
  { nombre: 'Hamburguesa clásica', precio: '95', imagen: 'img/productos/hamburguesa.webp', whatsapp: WA, categoria: 'Comida', descripcion: 'Carne de res, queso, lechuga y jitomate con papas.' },
  { nombre: 'Tacos de pastor', precio: '70', imagen: 'img/productos/tacos.webp', whatsapp: WA, categoria: 'Comida', descripcion: 'Orden de 4 tacos con piña, cebolla y cilantro.' },
  { nombre: 'Torta de jamón', precio: '55', imagen: 'img/productos/torta.webp', whatsapp: WA, categoria: 'Comida', descripcion: 'Pan telera con jamón, aguacate y frijoles.' },
  { nombre: 'Pastel de chocolate', precio: '48', imagen: 'img/productos/pastel.webp', whatsapp: WA, categoria: 'Postres', descripcion: 'Rebanada húmeda con cobertura de ganache.' },
  { nombre: 'Flan napolitano', precio: '35', imagen: 'img/productos/flan.webp', whatsapp: WA, categoria: 'Postres', descripcion: 'Flan casero con caramelo.' },
  { nombre: 'Galletas de avena', precio: '28', imagen: 'img/productos/galletas.webp', whatsapp: WA, categoria: 'Postres', descripcion: 'Bolsa con 3 galletas con pasas.' },
  { nombre: 'Café americano', precio: '32', imagen: 'img/productos/cafe.webp', whatsapp: WA, categoria: 'Bebidas', descripcion: 'Café de Chiapas, 12 oz, caliente o frío.' },
  { nombre: 'Limonada con chía', precio: '38', imagen: 'img/productos/limonada.webp', whatsapp: WA, categoria: 'Bebidas', descripcion: 'Limonada natural de 16 oz con chía.' },
  { nombre: 'Malteada de fresa', precio: '58', imagen: 'img/productos/malteada.webp', whatsapp: WA, categoria: 'Bebidas', descripcion: 'Fresas naturales, leche y helado de vainilla.' },
  { nombre: 'Papas con queso', precio: '45', imagen: 'img/productos/papas.webp', whatsapp: WA, categoria: 'Snacks', descripcion: 'Papas a la francesa con salsa de queso.' }
];

// Los productos del dueño van primero y los de prueba (demo) después.
// Cuando ya no quieran ver los demo, cambiar MOSTRAR_DEMO a false.
function obtenerProductos() {
  let propios = [];
  try {
    const guardados = JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS));
    if (Array.isArray(guardados)) propios = guardados;
  } catch (e) {}
  return MOSTRAR_DEMO ? [...propios, ...PRODUCTOS_DEMO] : propios;
}
