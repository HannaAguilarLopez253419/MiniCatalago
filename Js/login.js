const formLogin = document.getElementById("formLogin");
const mensajeLogin = document.getElementById("mensajeLogin");
const seccionLogin = document.getElementById("seccionLogin");
const seccionRegistro = document.getElementById("seccionRegistro");

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    if (correo === "admin@admin.com" && contrasena === "1234") {
        window.location.href = "admin.html";
    } else {
        mensajeLogin.textContent = "Correo o contraseña incorrectos";
    }
});

document.getElementById("irRegistro").addEventListener("click", function () {
    seccionLogin.hidden = true;
    seccionRegistro.hidden = false;
});

document.getElementById("irLogin").addEventListener("click", function () {
    seccionRegistro.hidden = true;
    seccionLogin.hidden = false;
});

document.getElementById("formRegistro").addEventListener("submit", function (event) {
    event.preventDefault();

    const contrasena = document.getElementById("contrasenaRegistro").value;
    const confirmar = document.getElementById("confirmarContrasena").value;

    if (contrasena === confirmar) {
        window.location.href = "admin.html";
    } else {
        document.getElementById("mensajeRegistro").textContent = "Las contraseñas no coinciden";
    }
});

if (window.location.hash === "#registro") {
    seccionLogin.hidden = true;
    seccionRegistro.hidden = false;
}