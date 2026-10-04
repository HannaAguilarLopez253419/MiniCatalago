
const listaProductos = document.getElementById("listaProductos");
const formulario = document.getElementById("formularioProducto");
const formProducto = document.getElementById("formProducto");

let plan = localStorage.getItem("plan") || "FREE";
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let indiceEditando = null;

function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function mostrarPlan() {
    if (plan === "PREMIUM") {
        document.getElementById("nombrePlan").textContent = "PREMIUM";
        document.getElementById("precioPlan").textContent = "$79 / mes";
        document.getElementById("btnPremium").hidden = true;
    }
}

function abrirFormulario(titulo, textoBoton) {
    document.getElementById("tituloFormulario").textContent = titulo;
    document.getElementById("btnGuardar").textContent = textoBoton;
    formulario.hidden = false;
}

function cerrarFormulario() {
    formulario.hidden = true;
    formProducto.reset();
    indiceEditando = null;
}

function mostrarProductos() {
    listaProductos.innerHTML = "";

    productos.forEach(function(producto, indice) {
        const tarjeta = document.createElement("div");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="info">
                <span class="categoria">${producto.categoria}</span>
                <h3>${producto.nombre}</h3>
                <p class="precio">$${producto.precio}</p>
                <p>${producto.descripcion}</p>
                <a href="${producto.whatsapp}" target="_blank" class="btnWhatsapp">
                    Probar link de WhatsApp
                </a>
                <div class="acciones">
                    <button class="btnEditar">Editar</button>
                    <button class="btnEliminar">Eliminar</button>
                </div>
            </div>
        `;

        tarjeta.querySelector(".btnEditar").addEventListener("click", function() {
            indiceEditando = indice;

            formProducto.nombre.value = producto.nombre;
            formProducto.precio.value = producto.precio;
            formProducto.imagen.value = producto.imagen;
            formProducto.whatsapp.value = producto.whatsapp;
            formProducto.categoria.value = producto.categoria;
            formProducto.descripcion.value = producto.descripcion;

            abrirFormulario("Editar producto", "Actualizar producto");
        });

        tarjeta.querySelector(".btnEliminar").addEventListener("click", function() {
            productos.splice(indice, 1);
            guardarProductos();
            mostrarProductos();
        });

        listaProductos.appendChild(tarjeta);
    });

    if (productos.length === 0) {
        listaProductos.innerHTML = "<p>Todavía no tienes productos registrados</p>";
    }

    const limite = plan === "PREMIUM" ? 1000 : 10;
    const textoLimite = plan === "PREMIUM" ? "∞" : limite;
    const porcentaje = plan === "PREMIUM" ? 100 : productos.length / limite * 100;

    document.getElementById("contadorProductos").textContent =
        `${productos.length} / ${textoLimite}`;

    document.getElementById("contadorProductosCard").textContent =
        `${productos.length} / ${textoLimite} productos`;

    document.getElementById("barraProductos").style.width = porcentaje + "%";
}

document.getElementById("btnPremium").addEventListener("click", function() {
    window.location.href = "pagos.html";
});

document.getElementById("btnAgregarProducto").addEventListener("click", function() {
    const limite = plan === "PREMIUM" ? 1000 : 10;

    if (productos.length >= limite) {
        alert("Has alcanzado el límite de productos de tu plan.");
        return;
    }

    indiceEditando = null;
    formProducto.reset();
    abrirFormulario("Agregar producto", "Guardar producto");
});

document.getElementById("btnCancelar").addEventListener("click", cerrarFormulario);

formProducto.addEventListener("submit", function(event) {
    event.preventDefault();

    const producto = {
        nombre: formProducto.nombre.value,
        precio: formProducto.precio.value,
        imagen: formProducto.imagen.value,
        whatsapp: formProducto.whatsapp.value,
        categoria: formProducto.categoria.value,
        descripcion: formProducto.descripcion.value
    };

    if (indiceEditando === null) {
        productos.push(producto);
    } else {
        productos[indiceEditando] = producto;
    }

    guardarProductos();
    mostrarProductos();
    cerrarFormulario();
});

document.getElementById("btnCerrarSesion").addEventListener("click", function() {
    window.location.href = "login.html";
});

mostrarPlan();
mostrarProductos();