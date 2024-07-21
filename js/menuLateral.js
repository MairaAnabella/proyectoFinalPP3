/* CERRAR SESION */


// Código adicional para manejar la lógica de la barra lateral aquí

/* var btnSalir = document.getElementById('btnSalir');

btnSalir.addEventListener('click', () => {
    logout();
    window.location.href = 'index.html';
})

function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('rol');
} */

/*Boton para ocultar en modo escritorio y volverlo hacer visible en modo movil, tambien realizar que con un boton se oculta la barra lateral*/
/* const cloud = document.getElementById("school");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");
document.addEventListener("DOMContentLoaded", () => {
    const cloud = document.getElementById("school");
    const barraLateral = document.querySelector(".barra-lateral");
    const spans = document.querySelectorAll(".barra-lateral span");
    const menu = document.querySelector(".menu");
    const main = document.querySelector("main");

    // Cargar en formato mini por defecto
    barraLateral.classList.add("mini-barra-lateral");
    spans.forEach((span) => {
        span.classList.add("oculto");
    });

    menu.addEventListener("click", () => {
        barraLateral.classList.toggle("max-barra-lateral");
        barraLateral.classList.toggle("mini-barra-lateral");

        if (barraLateral.classList.contains("max-barra-lateral")) {
            menu.children[0].style.display = "none";
            menu.children[1].style.display = "block";
            spans.forEach((span) => {
                span.classList.remove("oculto");
            });
        } else {
            menu.children[0].style.display = "block";
            menu.children[1].style.display = "none";
            spans.forEach((span) => {
                span.classList.add("oculto");
            });
        }
    });

    cloud.addEventListener("click", () => {
        barraLateral.classList.toggle("mini-barra-lateral");
        main.classList.toggle("min-main");
        spans.forEach((span) => {
            span.classList.toggle("oculto");
        });
    });
});
 */

/* lateral nuevo
 */


let arrow = document.querySelectorAll('.arrow');
console.log(arrow)
for(var i=0; i< arrow.length;i++){
    console.log(arrow[i])
    arrow[i].addEventListener("click",(e)=>{
         let arrowParent= e.target.parentElement.parentElement; 
        console.log(arrowParent)
        arrowParent.classList.toggle('showMenu');
    })
}

/* let sidebar = document.querySelector('.close');
let sidebarBtn = document.querySelector('.bxs-school');
console.log(sidebar)

sidebarBtn.addEventListener("click", ()=>{
    sidebar.classList.remove('close');
}) */

    let sidebar = document.querySelector('.close');
let sidebarBtn = document.querySelector('.bxs-school');
console.log(sidebar);

sidebarBtn.addEventListener("click", () => {
    if (sidebar.classList.contains('close')) {
        sidebar.classList.remove('close');
    } else {
        sidebar.classList.add('close');
    }
});