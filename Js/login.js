const formLogin = document.getElementById("formLogin");
const mensajeLogin = document.getElementById("mensajeLogin");

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    if (correo === "admin@correo.com" && contrasena === "1234") {
        window.location.href = "admin.html";
    } else {
        mensajeLogin.textContent = "Correo o contraseña incorrectos";
    }
});