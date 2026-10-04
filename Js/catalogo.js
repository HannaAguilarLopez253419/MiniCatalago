const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const productos = obtenerProductos();
let categoria = 'todo', texto = '';

// Quita acentos y pasa a minúsculas: "Café" -> "cafe"
const limpiar = s => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const claveCat = p => (p.categoria || '').trim().toLowerCase();

// Usa el link de WhatsApp que el dueño escribió en el admin y le agrega el mensaje del producto.
function linkWhatsApp(p) {
  const base = String(p.whatsapp || '');
  if (!/^https?:\/\//.test(base)) return '#';
  const mensaje = `Hola, quiero pedir: ${p.nombre} ($${p.precio})`;
  return base + (base.includes('?') ? '&' : '?') + 'text=' + encodeURIComponent(mensaje);
}

function pintarChips() {
  const vistas = new Map();
  productos.forEach(p => { const k = claveCat(p); if (k && !vistas.has(k)) vistas.set(k, p.categoria.trim()); });
  const cats = [['todo', 'Todo'], ...vistas];
  $('#chips').innerHTML = cats.map(([k, n]) =>
    `<button class="chip${k === categoria ? ' activo' : ''}" data-cat="${esc(k)}">${esc(n)}</button>`).join('');
}

function filtrar() {
  const t = limpiar(texto).trim();
  return productos.filter(p =>
    (categoria === 'todo' || claveCat(p) === categoria) &&
    (!t || limpiar(`${p.nombre} ${p.descripcion || ''}`).includes(t)));
}

// Mismo diseño de tarjeta que el panel admin
function tarjeta(p) {
  const foto = p.imagen ? `<img src="${esc(p.imagen)}" alt="${esc(p.nombre)}" loading="lazy">`
    : `<div class="sin-foto" aria-hidden="true">${esc((p.nombre || '?')[0])}</div>`;
  return `<article class="tarjeta">${foto}<div class="info">
    <span class="categoria">${esc(p.categoria || '')}</span>
    <h3>${esc(p.nombre)}</h3>
    <p class="precio">$${esc(p.precio)}</p>
    <p>${esc(p.descripcion || '')}</p>
    <a class="btnWhatsapp" href="${esc(linkWhatsApp(p))}" target="_blank" rel="noopener">Pedir por WhatsApp</a>
    </div></article>`;
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

$('#negocio').textContent = NEGOCIO.nombre;
pintarChips(); pintarProductos();