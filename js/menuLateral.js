/* CERRAR SESION */


// Código adicional para manejar la lógica de la barra lateral aquí

var btnSalir = document.getElementById('btnSalir');

btnSalir.addEventListener('click', () => {
    logout();
    window.location.href = 'index.html';
})

function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('rol');
}


/* MENU LATERAL */

let arrow = document.querySelectorAll('.arrow');
console.log(arrow)
for (var i = 0; i < arrow.length; i++) {
    console.log(arrow[i])
    arrow[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement.parentElement;
        console.log(arrowParent)
        arrowParent.classList.toggle('showMenu');
    })
}



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

// cargo los elementos del Dom
const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
const menu = document.querySelector('.sidebar');
const abierto=document.getElementById('abierto');
const cerrado=document.getElementById('cerrado');


// evento del boton flotante
toggleSidebarBtn.addEventListener('click', () => {
    menu.classList.toggle('close');
   
    if (menu.classList.contains('close')) {
        menu.style.transform = 'translateX(-100%)';
        cerrado.style.display = 'none';
        abierto.style.display = 'block';
      
    } else {
        menu.style.transform = 'translateX(0)';
        cerrado.style.display = 'block';
        abierto.style.display = 'none';
    }
});
// Verifico el tamaño de la pantalla para que me muestre el menu
function checkScreenSize() {
    const screenWidth = window.innerWidth;
    const sidebar = document.querySelector('.sidebar');
  
    if (screenWidth < 768) {
      sidebar.style.transform = 'translateX(-100%)';
    } else {
      sidebar.style.transform = 'translateX(0)';
    }
  }
  
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);