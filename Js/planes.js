/* planes.js – Lógica de planes y monetización simulada.
   Cargar después de utils.js.

   Uso desde admin.html:
   Planes.actual()               -> "FREE" | "PREMIUM"
   Planes.puedeAgregarProducto() -> false si es FREE y ya hay 10 productos
*/

const Planes = {

    actual() {
        return (localStorage.getItem(CLAVES.plan) || "FREE").toUpperCase();
    },

    esPremium() {
        return Planes.actual() === "PREMIUM";
    },

    totalProductos() {
        return productos.length;
    },

    puedeAgregarProducto() {
        return Planes.esPremium() || Planes.totalProductos() < LIMITE_FREE;
    },

    activarPremium() {
        localStorage.setItem("plan", "PREMIUM");
    },

    volverAFree() {
        localStorage.setItem("plan", "FREE");
    }
};