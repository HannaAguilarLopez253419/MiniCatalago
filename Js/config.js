/* config.js – Valores que se editan en un solo lugar */

// Número del negocio para recibir pedidos (código de país + número, sin "+")
const NEGOCIO_WHATSAPP = "5219610000000";

// Mostrar datos de ejemplo en el catálogo del carrito cuando no hay productos reales
const USAR_MOCK = true;

// Planes
const LIMITE_FREE = 10;
const PRECIO_PREMIUM = 79; // MXN al mes

// Claves de localStorage
const CLAVES = {
    plan: "plan",             // "FREE" | "PREMIUM"
    productos: "productos",   // los guarda el administrador
    carrito: "mc_carrito",
    pedidos: "mc_pedidos"
};