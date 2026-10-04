/* =========================================================
   MENÚ EN CELULAR
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    /*
        Al pulsar ☰ agregamos o quitamos la clase "open".
        En el CSS, ".nav-menu.open" es la regla que muestra el menú.
    */
    menuToggle.addEventListener("click", () => {

        const abierto = navMenu.classList.toggle("open");

        /* aria-expanded le avisa a lectores de pantalla si está abierto */
        menuToggle.setAttribute("aria-expanded", abierto);

    });

    /* Al elegir un enlace, el menú se cierra solo */
    navMenu.querySelectorAll("a").forEach((enlace) => {

        enlace.addEventListener("click", () => {

            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

}


/* =========================================================
   AÑO DEL FOOTER
========================================================= */

const anio = document.getElementById("anio");

if (anio) {
    anio.textContent = new Date().getFullYear();
}



const carouselTrack = document.getElementById("carouselTrack");

const nextButton = document.getElementById("nextSlide");

const previousButton = document.getElementById("prevSlide");

const dots = document.querySelectorAll(".carousel-dot");


let currentSlide = 0;

const totalSlides = dots.length;


/*
    Muestra el slide seleccionado.
*/
function mostrarSlide(numero) {

    if (!carouselTrack) {
        return;
    }

    /*
        Si llegamos al último slide
        regresamos al primero.
    */
    if (numero >= totalSlides) {
        currentSlide = 0;
    }

    /*
        Si estamos antes del primer slide
        vamos al último.
    */
    else if (numero < 0) {
        currentSlide = totalSlides - 1;
    }

    else {
        currentSlide = numero;
    }


    /*
        Movemos horizontalmente el carrusel.
    */
    carouselTrack.style.transform =
        `translateX(-${currentSlide * 100}%)`;


    /*
        Actualizamos los puntos.
    */
    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentSlide
        );

    });

}


/* =========================================================
   BOTÓN SIGUIENTE
========================================================= */

if (nextButton) {

    nextButton.addEventListener("click", () => {

        mostrarSlide(currentSlide + 1);

    });

}


/* =========================================================
   BOTÓN ANTERIOR
========================================================= */

if (previousButton) {

    previousButton.addEventListener("click", () => {

        mostrarSlide(currentSlide - 1);

    });

}


/* =========================================================
   PUNTOS DEL CARRUSEL
========================================================= */

dots.forEach((dot) => {

    dot.addEventListener("click", () => {

        const slide =
            Number(dot.dataset.slide);

        mostrarSlide(slide);

    });

});


/* =========================================================
   CAMBIO AUTOMÁTICO
========================================================= */

/*
    Cada 6 segundos cambia automáticamente.
    Se pausa mientras el mouse (o el teclado) está sobre el carrusel,
    y no se activa si la persona prefiere menos movimiento.
*/

let temporizador = null;

function iniciarAutomatico() {

    detenerAutomatico();

    temporizador = setInterval(() => {

        mostrarSlide(currentSlide + 1);

    }, 6000);

}

function detenerAutomatico() {

    clearInterval(temporizador);

}

const menosMovimiento =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!menosMovimiento && carouselTrack) {

    iniciarAutomatico();

    const carousel = carouselTrack.parentElement;

    carousel.addEventListener("mouseenter", detenerAutomatico);
    carousel.addEventListener("mouseleave", iniciarAutomatico);
    carousel.addEventListener("focusin", detenerAutomatico);
    carousel.addEventListener("focusout", iniciarAutomatico);

}


/* =========================================================
   NAVEGACIÓN POR CATEGORÍAS
========================================================= */

/*
    Las categorías ya utilizan enlaces como:

    catalogo.html?categoria=moda

    catalogo.html?categoria=tecnologia

    etc.

    De esta forma no necesitamos JavaScript
    para realizar la navegación.

    El compañero que haga catalogo.html
    podrá leer el parámetro "categoria"
    y mostrar los productos correspondientes.
*/


/* =========================================================
   ANIMACIÓN DE ENTRADA DE LAS CARDS
========================================================= */

const businessCards =
    document.querySelectorAll(".business-card");


businessCards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(15px)";


    setTimeout(() => {

        card.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";

        card.style.opacity = "1";

        card.style.transform =
            "translateY(0)";

    }, 100 + (index * 100));

});


/* =========================================================
   VERIFICACIÓN
========================================================= */

console.log(
    "MiniCatálogo: inicio.js conectado correctamente."
);