const limite = 10;
const listaProductos = document.getElementById("listaProductos");
const modal = document.getElementById("formularioProducto");
const formProducto = document.getElementById("formProducto");

let productos = [];
let indiceEditando = null;

function abrirFormulario(titulo, textoBoton) {
    document.getElementById("tituloFormulario").textContent = titulo;
    document.getElementById("btnGuardar").textContent = textoBoton;
    modal.hidden = false;
}

function cerrarFormulario() {
    modal.hidden = true;
    formProducto.reset();
    indiceEditando = null;
}

function mostrarProductos() {
    listaProductos.innerHTML = "";

    productos.forEach(function (producto, indice) {
        const tarjeta = document.createElement("div");

        let imagen = "";
        if (producto.imagen !== "") {
            imagen = `<img src="${producto.imagen}">`;
        }

        tarjeta.innerHTML = `
            ${imagen}
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}</p>
            <p>${producto.categoria}</p>
            <p>${producto.descripcion}</p>
            <button class="btnEditar">Editar</button>
            <button class="btnEliminar">Eliminar</button>
        `;

        tarjeta.querySelector(".btnEditar").addEventListener("click", function () {
            indiceEditando = indice;
            formProducto.nombre.value = producto.nombre;
            formProducto.precio.value = producto.precio;
            formProducto.categoria.value = producto.categoria;
            formProducto.descripcion.value = producto.descripcion;
            formProducto.imagen.value = producto.imagen;
            abrirFormulario("Editar producto", "Actualizar producto");
        });

        tarjeta.querySelector(".btnEliminar").addEventListener("click", function () {
            productos.splice(indice, 1);
            mostrarProductos();
        });

        listaProductos.appendChild(tarjeta);
    });

    if (productos.length === 0) {
        listaProductos.innerHTML = "<p>Todavía no tienes productos registrados</p>";
    }

    document.getElementById("contadorProductos").textContent = productos.length + " / " + limite;
    document.getElementById("contadorProductosCard").textContent = productos.length + " / " + limite + " productos";
}

document.getElementById("btnAgregarProducto").addEventListener("click", function () {
    if (productos.length >= limite) {
        alert("Has alcanzado el límite de 10 productos de tu plan FREE");
    } else {
        abrirFormulario("Agregar producto", "Guardar producto");
    }
});

document.getElementById("btnCancelar").addEventListener("click", cerrarFormulario);

formProducto.addEventListener("submit", function (event) {
    event.preventDefault();

    const producto = {
        nombre: formProducto.nombre.value,
        precio: formProducto.precio.value,
        categoria: formProducto.categoria.value,
        descripcion: formProducto.descripcion.value,
        imagen: formProducto.imagen.value
    };

    if (indiceEditando === null) {
        productos.push(producto);
    } else {
        productos[indiceEditando] = producto;
    }

    mostrarProductos();
    cerrarFormulario();
});

document.getElementById("btnCerrarSesion").addEventListener("click", function () {
    window.location.href = "login.html";
});