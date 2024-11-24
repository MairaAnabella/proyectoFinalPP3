

// Verificar si el usuario está autenticado al cargar la página
document.addEventListener('DOMContentLoaded', function () {

    // Verificar si las variables de sesión están presentes en localStorage
    var email = localStorage.getItem('email');
    var nombre = localStorage.getItem('nombre');
    var apellido = localStorage.getItem('apellido');
    var rol = localStorage.getItem('rol');
    var genero=localStorage.getItem('genero');
    sessionStorage.getItem('idUser');


    

    // Actualizar la foto de perfil si existe en localStorage
    const fotoPerfilElement = document.getElementById('fotoPerfil');
    const fotoPerfilMenuElement = document.getElementById('fotoPerfilMenu');
    if (genero==='F') {
        fotoPerfilElement.src = "asset/femenino.png"; // Cambiar la fuente de la imagen
        fotoPerfilMenuElement.src = "asset/femenino.png"; // Cambiar la fuente de la imagen
    }else{
        fotoPerfilElement.src = "asset/masculino.png"; // Cambiar la fuente de la imagen
        fotoPerfilMenuElement.src = "asset/masculino.png"; // Cambiar la fuente de la imagen
    }


    if (!email && !nombre && !apellido && !rol) {
        // Si falta alguna variable de sesión, redirigir al usuario al inicio de sesión
        window.location.href = 'login.html';
    } else {



        /* asigno nombre de usuario al mensaje y al menu en HTML*/
        const nombreUser = document.getElementById('nombreUser');
        nombreUser.innerText = 'Hola, ' + nombre + ' ' + apellido;
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


        /* ocultar botones segun rol */

        var contenedorAdmUser = document.getElementById('contenedor-admUser');
        var contenedorAdmAlumnos = document.getElementById('contenedor-admAlumnos');
        var contenedorNotificados = document.getElementById('contenedor-comunicado');
        var contenedorMaterias = document.getElementById('contenedor-materias');
        var accionesCardNotas = document.getElementById('notas-adm');
        var accionesCardAsistencia = document.getElementById('asistencia-adm');
        var accionesCardCalificacionesPadres = document.getElementById('notas-padres');
        var accionesCardAsistenciaPadres = document.getElementById('asistencia-padres');
        var btnEstudiantes = document.getElementById('btnEstudiantes');
        var btnUser = document.getElementById('btnUser');
        var btnMaterias = document.getElementById('btnMaterias');
        var btnCursos = document.getElementById('btnCursos');
        var btnComunicados = document.getElementById('btnComunicados');
        var submenuPadre = document.getElementById('subMenuPadre');
        var submenuPadreAsis = document.getElementById('subMenuPadreAsis');
        var submenuAdmi = document.getElementById('subMenuAdmi');
        var submenuAdmiNotas = document.getElementById('subMenuAdmiNotas');
        console.log(rol)
        if (rol == 4) {
            contenedorAdmAlumnos.style.display = 'none';
            contenedorAdmUser.style.display = 'none';
            contenedorNotificados.style.display = 'none';
            contenedorMaterias.style.display = 'none';
            accionesCardNotas.style.display = 'none';
            btnEstudiantes.style.display = 'none';
            btnUser.style.display = 'none';
            btnMaterias.style.display = 'none';
            btnCursos.style.display = 'none';
            btnComunicados.style.display = 'none';
            accionesCardAsistencia.style.display = 'none';
            submenuAdmi.style.display = 'none';
            submenuAdmiNotas.style.display = 'none';

        } else {
            accionesCardCalificacionesPadres.style.display = 'none';
            accionesCardAsistenciaPadres.style.display = 'none';
            submenuPadre.style.display = 'none';
            submenuPadreAsis.style.display = 'none';
        }



    }
});


/* 

function togglePopup() {
    const popup = document.getElementById('accountPopup');
    popup.classList.toggle('active');
}

// Close popup when clicking outside
document.addEventListener('click', function(event) {
    const popup = document.getElementById('accountPopup');
    const toggleBtn = document.querySelector('.toggle-btn');
    const profileSection = document.querySelector('.profile-section');
    
    if (!popup.contains(event.target) && !toggleBtn.contains(event.target) && !profileSection.contains(event.target)) {
        popup.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const photoInput = document.getElementById('photoInput');
    const userPhoto = document.getElementById('userPhoto');

    photoInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                userPhoto.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
});








 */