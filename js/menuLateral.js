/* CERRAR SESION */


document.addEventListener('DOMContentLoaded', function () {
    var nombre = localStorage.getItem('nombre');
    var rol = localStorage.getItem('rol');
    var genero=localStorage.getItem('genero');
    sessionStorage.getItem('idUser');

  /* asigno nombre de usuario al mensaje y al menu en HTML*/

  const nombreMenu = document.getElementById('nombre-user');
  nombreMenu.innerText = nombre;
  const idRol = document.getElementById('rol-user');
  switch (rol) {
      case '1':
          idRol.innerText = 'Administrador';
          break;
      case '2':
          idRol.innerText = 'Director';
          break;
      case '3':
          idRol.innerText = 'Preceptor';
          break;
      case '4':
          idRol.innerText = 'Tutor';
          break;
  }

    console.log(genero)
    // Actualizar la foto de perfil si existe en localStorage
    const fotoPerfilElement = document.getElementById('fotoPerfil');
    if (genero==='F') {
        fotoPerfilElement.src = "asset/femenino.png"; // Cambiar la fuente de la imagen
    }else{
        fotoPerfilElement.src = "asset/masculino.png"; // Cambiar la fuente de la imagen
    }


})


var rol = localStorage.getItem('rol');


        /* ocultar botones segun rol */

       
        var btnEstudiantes = document.getElementById('btnEstudiantes');
        var btnUser = document.getElementById('btnUser');
        var btnMaterias = document.getElementById('btnMaterias');
        var btnCursos  = document.getElementById('btnCursos');
        var btnComunicados  = document.getElementById('btnComunicados');
        var submenuPadre= document.getElementById('subMenuPadre');
        var submenuPadreAsis= document.getElementById('subMenuPadreAsis');
        var submenuAdmi= document.getElementById('subMenuAdmi');
        var submenuAdmiNotas= document.getElementById('subMenuAdmiNotas');
        console.log(rol)
        if (rol == 4) {
            
            btnEstudiantes.style.display = 'none';
            btnUser.style.display = 'none';
            btnMaterias.style.display = 'none';
            btnCursos.style.display = 'none';
            btnComunicados.style.display = 'none';
        
            submenuAdmi.style.display='none';
            submenuAdmiNotas.style.display='none';

        }else{
         
            submenuPadre.style.display='none';
            submenuPadreAsis.style.display='none';
        }
        









// Código adicional para manejar la lógica de la barra lateral aquí

var btnSalir = document.getElementById('btnSalir');

btnSalir.addEventListener('click', () => {
    logout();
    window.location.href = 'index.html';
})

function logout() {
    localStorage.removeItem('idUser');
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('rol');
    localStorage.removeItem('genero');
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