/* mock.js – Datos de ejemplo para visualizar el catálogo mientras no haya
   productos reales del administrador. No se guardan en localStorage.
   Se usan solo si USAR_MOCK es true (config.js) y "productos" está vacío. */

const PRODUCTOS_MOCK = [
    { id: "m1", nombre: "Café de olla 350 ml",     precio: 45,  categoria: "Bebidas",  emoji: "☕" },
    { id: "m2", nombre: "Frappé de vainilla",      precio: 62,  categoria: "Bebidas",  emoji: "🥤" },
    { id: "m3", nombre: "Pan de elote",            precio: 38,  categoria: "Panadería", emoji: "🌽" },
    { id: "m4", nombre: "Concha de chocolate",     precio: 18,  categoria: "Panadería", emoji: "🥐" },
    { id: "m5", nombre: "Sándwich de pollo",       precio: 85,  categoria: "Comida",   emoji: "🥪" },
    { id: "m6", nombre: "Ensalada de la casa",     precio: 74,  categoria: "Comida",   emoji: "🥗" },
    { id: "m7", nombre: "Pastel de zanahoria",     precio: 55,  categoria: "Postres",  emoji: "🍰" },
    { id: "m8", nombre: "Galletas de avena (6 pz)", precio: 48, categoria: "Postres",  emoji: "🍪" }
];