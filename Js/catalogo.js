const $ = s => document.querySelector(s);
const moneda = n => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const productos = obtenerProductos();
let categoria = 'Todo', texto = '';

const precioFinal = p => (p.enOferta && p.precioOferta ? p.precioOferta : p.precio);

// Link de WhatsApp del dueño, con el mensaje del producto ya escrito.
// Si un producto trae su propio campo "whatsapp", se usa ese; si no, el del negocio.
function linkWhatsApp(p) {
  const numero = p.whatsapp || NEGOCIO.whatsapp;
  const mensaje = `Hola, quiero pedir: ${p.nombre} (${moneda(precioFinal(p))})`;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

function pintarChips() {
  const cats = ['Todo', ...new Set(productos.map(p => p.categoria))];
  if (productos.some(p => p.enOferta)) cats.push('Ofertas');
  $('#chips').innerHTML = cats.map(c =>
    `<button class="chip${c === categoria ? ' activo' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
}

function filtrar() {
  const t = texto.trim().toLowerCase();
  return productos.filter(p =>
    (categoria === 'Todo' || (categoria === 'Ofertas' ? p.enOferta : p.categoria === categoria)) &&
    (!t || p.nombre.toLowerCase().includes(t)));
}

function tarjeta(p) {
  const foto = p.imagen ? `<img src="${esc(p.imagen)}" alt="${esc(p.nombre)}" loading="lazy">`
    : `<span class="inicial" aria-hidden="true">${esc(p.nombre[0])}</span>`;
  const precio = p.enOferta && p.precioOferta
    ? `<s>${moneda(p.precio)}</s> <strong>${moneda(p.precioOferta)}</strong>` : `<strong>${moneda(p.precio)}</strong>`;
  return `<article class="tarjeta"><div class="foto">${foto}${p.enOferta ? '<span class="etiqueta">Oferta</span>' : ''}</div>
    <div class="info"><h3>${esc(p.nombre)}</h3>
    <div class="pie"><span class="precio">${precio}</span>
    <a class="pedir" href="${linkWhatsApp(p)}" target="_blank" rel="noopener">Pedir por WhatsApp</a></div></div></article>`;
}

function pintarProductos() {
  const l = filtrar();
  $('#contador').textContent = `${l.length} ${l.length === 1 ? 'producto' : 'productos'}`;
  $('#grid').innerHTML = l.length ? l.map(tarjeta).join('')
    : '<div class="vacio"><b>No encontramos productos</b><span>Prueba con otra palabra o elige otra categoría.</span></div>';
}

$('#chips').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  categoria = b.dataset.cat; pintarChips(); pintarProductos();
});
$('#buscar').addEventListener('input', e => { texto = e.target.value; pintarProductos(); });
$('#ver-ofertas').onclick = () => { categoria = 'Ofertas'; pintarChips(); pintarProductos(); $('#catalogo').scrollIntoView({ behavior: 'smooth' }); };

$('#negocio').textContent = NEGOCIO.nombre;
pintarChips(); pintarProductos();