
/* obtener datos del login */
var datosLogin= new URLSearchParams(window.location.search);
var nombre=datosLogin.get('nombre');
var apellido=datosLogin.get('apellido');
var rolUser=datosLogin.get('rol');

/* asigno nombre de usuario al mensaje en HTML*/
var nombreUser=document.getElementById('nombreUser');
nombreUser.innerText='Hola '+nombre+' '+apellido;


/* ocultar botones segun rol */

/* var contenedorAsistencias=document.getElementById('contenedor-asistencias');
var contenedorMaterias=document.getElementById('contenedor-materias');
var contenedorNotas=document.getElementById('contenedor-notas'); */
var contenedorAdmUser=document.getElementById('contenedor-admUser');
var contenedorAdmAlumnos=document.getElementById('contenedor-admAlumnos');
var contenedorAdmRoles=document.getElementById('contenedor-admRoles');
var btnHistoria=document.getElementById('btnHistoria');
var btnRoles=document.getElementById('btnRoles');

if(rolUser==4){
    contenedorAdmAlumnos.style.display='none';
    contenedorAdmRoles.style.display='none';
    contenedorAdmUser.style.display='none';
    btnHistoria.style.display='none';
    btnRoles.style.display='none';
}

/* CERRAR SESION */

var btnSalir=document.getElementById('btnSalir');

btnSalir.addEventListener('click',()=>{
   console.log(localStorage.getItem(userId));
    localStorage.removeItem('userId');
    window.location.href='index.html';
})

/*Boton para ocultar en modo escritorio y volverlo hacer visible en modo movil, tambien realizar que con un boton se oculta la barra lateral*/ 
const cloud = document.getElementById("school");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");

menu.addEventListener("click",()=>{
    barraLateral.classList.toggle("max-barra-lateral");
    if(barraLateral.classList.contains("max-barra-lateral")){
        menu.children[0].style.display = "none";
        menu.children[1].style.display = "block";
    }
    else{
        menu.children[0].style.display = "block";
        menu.children[1].style.display = "none";
    }
    if(window.innerWidth<=320){
        barraLateral.classList.add("mini-barra-lateral");
        main.classList.add("min-main");
        spans.forEach((span)=>{
            span.classList.add("oculto");
        })
    }
});

cloud.addEventListener("click",()=>{
    barraLateral.classList.toggle("mini-barra-lateral");
    main.classList.toggle("min-main");
    spans.forEach((span)=>{
        span.classList.toggle("oculto");
    });
});