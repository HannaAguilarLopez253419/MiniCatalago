/* utils.js – Funciones compartidas (cargar después de config.js) */

// --- Productos que sube el administrador ---
let productos = [];

if (localStorage.getItem("productos") !== null) {
    productos = JSON.parse(localStorage.getItem("productos"));
}

// --- localStorage ---
function leer(clave, valorPorDefecto) {
    try {
        return JSON.parse(localStorage.getItem(clave)) ?? valorPorDefecto;
    } catch {
        return valorPorDefecto;
    }
}

function guardar(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

// --- Formato ---
function mxn(numero) {
    return numero.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}

// --- DOM ---
function $(id) {
    return document.getElementById(id);
}

// Crea un elemento; el texto se asigna con textContent (evita inyectar HTML)
function el(etiqueta, clase = "", texto = "") {
    const nodo = document.createElement(etiqueta);
    if (clase) nodo.className = clase;
    if (texto) nodo.textContent = texto;
    return nodo;
}