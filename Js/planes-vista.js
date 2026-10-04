/* planes-vista.js – Pinta y maneja eventos de planes.html
   Orden de scripts: config.js, utils.js, carrito.js, planes.js, planes-vista.js */

const DURACION_PAGO_SIMULADO = 1200; // ms

// ---------- Render ----------

function renderPlanes() {
    const premium = Planes.esPremium();
    const total = Planes.totalProductos();

    $("tagFree").hidden = premium;
    $("tagPrem").hidden = !premium;
    $("btnPremium").hidden = premium;
    $("btnFree").hidden = !premium;
    $("exito").classList.toggle("visible", premium);

    $("usoTxt").textContent = premium
        ? `${total} productos · sin límite`
        : `${total} de ${LIMITE_FREE} productos usados`;

    $("usoBarra").style.width = premium
        ? "100%"
        : `${Math.min(100, (total / LIMITE_FREE) * 100)}%`;
}

// ---------- Modal ----------

function abrirModal() {
    $("modal").classList.add("abierto");
}

function cerrarModal() {
    $("modal").classList.remove("abierto");
}

// ---------- Acciones ----------

function confirmarSuscripcion() {
    const boton = $("confirmar");
    boton.disabled = true;
    boton.textContent = "Procesando…";

    // Pago simulado: no se cobra nada
    setTimeout(() => {
        Planes.activarPremium();
        window.location.href = "admin.html";
    }, DURACION_PAGO_SIMULADO);
}

function volverAFree() {
    if (!confirm("¿Volver al plan Free? (solo para la demo)")) return;
    Planes.volverAFree();
    renderPlanes();
}

// ---------- Inicio ----------

document.addEventListener("DOMContentLoaded", () => {
    renderPlanes();

    $("btnPremium").addEventListener("click", abrirModal);
    $("cancelar").addEventListener("click", cerrarModal);
    $("confirmar").addEventListener("click", confirmarSuscripcion);
    $("btnFree").addEventListener("click", volverAFree);

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") cerrarModal();
    });
});