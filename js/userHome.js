

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













