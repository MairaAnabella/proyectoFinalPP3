

// Verificar si el usuario está autenticado al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    // Verificar si las variables de sesión están presentes en localStorage
    var email = localStorage.getItem('email');
    var nombre = localStorage.getItem('nombre');
    var apellido = localStorage.getItem('apellido');
    var rol = localStorage.getItem('rol');
    const userId = sessionStorage.getItem('userId');

    if (!email && !nombre && !apellido && !rol) {
        // Si falta alguna variable de sesión, redirigir al usuario al inicio de sesión
        window.location.href = 'login.html';
    } else {
 
       

        /* asigno nombre de usuario al mensaje en HTML*/
        var nombreUser = document.getElementById('nombreUser');
        nombreUser.innerText = 'Hola ' + nombre + ' ' + apellido;


        /* ocultar botones segun rol */

        /* var contenedorAsistencias=document.getElementById('contenedor-asistencias');
        var contenedorMaterias=document.getElementById('contenedor-materias');
        var contenedorNotas=document.getElementById('contenedor-notas'); */
        var contenedorAdmUser = document.getElementById('contenedor-admUser');
        var contenedorAdmAlumnos = document.getElementById('contenedor-admAlumnos');
        var contenedorAdmRoles = document.getElementById('contenedor-admRoles');
        var btnHistoria = document.getElementById('btnHistoria');
        var btnRoles = document.getElementById('btnRoles');

        if (rol == 4) {
            contenedorAdmAlumnos.style.display = 'none';
            contenedorAdmRoles.style.display = 'none';
            contenedorAdmUser.style.display = 'none';
            btnHistoria.style.display = 'none';
            btnRoles.style.display = 'none';
        }

 
    }
});













