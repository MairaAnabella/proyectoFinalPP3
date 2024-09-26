 const API_URL= 'http://3.83.173.143/backend/'; 

//const URL_API = 'http://localhost:3000/pp3/proyecto-loading/'


// Función para cargar cursos desde el servidor
function cargarCursos() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL+'get_cursos.php', true);
    xhr.onload = function () {
        if (this.status === 200) {
            var cursos = JSON.parse(this.responseText);
            var selectCurso = document.getElementById('curso');
            selectCurso.innerHTML = '<option value="">Seleccione un curso</option>';

           for (var i = 0; i < cursos.length; i++) {
                var option = document.createElement('option');
                option.value = cursos[i].Gradoid;
                option.textContent = cursos[i].Curso;
                selectCurso.appendChild(option);
            }
        }
    };
    xhr.send();
}

// Función para cargar alumnos según el curso seleccionado
function cargarAlumnos() {
    var cursoSeleccionado = document.getElementById('curso').value;
    console.log(cursoSeleccionado);
    var selectAlumno = document.getElementById('alumno');
    var selectTutorEmail = document.getElementById('tutorEmail');
    
    selectAlumno.innerHTML = '<option value="">Seleccione un Alumno</option>';
    selectTutorEmail.innerHTML = '';

    if(cursoSeleccionado) {
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL+'/get_alumnos.php?curso=' + encodeURIComponent(cursoSeleccionado), true);
    xhr.onload = function () {
        if (this.status === 200) {
            var alumnos = JSON.parse(this.responseText);
	console.log(alumnos);
            // var selectAlumno = document.getElementById('email_destinatario');
            // selectAlumno.innerHTML = '<option value="">Seleccione un Alumno</option>';
            
           for (var i = 0; i < alumnos.length; i++) {
                var option = document.createElement('option');
                option.value = alumnos[i].Alumnoid;  // Usamos Alumnoid como valor
                option.textContent = alumnos[i].Nombre + ' ' + alumnos[i].Apellido;
                selectAlumno.appendChild(option);
            }
        }
    };
    xhr.send();
}
}

// Función para cargar el email del tutor según el alumno seleccionado
function cargarEmailTutor() {
  var alumnoSeleccionado = document.getElementById('alumno').value;
  var selectTutorEmail = document.getElementById('tutorEmail');
  selectTutorEmail.innerHTML = ''; // Limpiar el select antes de cargar los nuevos datos

if (alumnoSeleccionado) {
var xhr = new XMLHttpRequest();
xhr.open('GET', API_URL+'get_email_tutor.php?alumnoid=' + encodeURIComponent(alumnoSeleccionado), true);
xhr.onload = function () {
    if (this.status === 200) {
        var data = JSON.parse(this.responseText);
        if (data.emailTutor) {
            var option = document.createElement('option');
            option.value = data.emailTutor;
            option.textContent = data.emailTutor;
            selectTutorEmail.appendChild(option);
        } else {
            var option = document.createElement('option');
            option.value = '';
            option.textContent = 'No se encontró el email del tutor';
            selectTutorEmail.appendChild(option);
        }
    }
};
xhr.send();
}
}



window.onload = function() {
    cargarCursos();
    document.getElementById('curso').addEventListener('change', cargarAlumnos);
    document.getElementById('alumno').addEventListener('change', cargarEmailTutor);
};


function notificacion() {
    var asunto = document.getElementById('asunto').value;
    var mensaje = document.getElementById('mensaje').value;
    var tutorEmail = document.getElementById('tutorEmail').value;
   
    var datos = new FormData();
    datos.append('asunto', asunto);
    datos.append('mensaje', mensaje);
    datos.append('tutorEmail', tutorEmail);

    document.getElementById('spinner').style.display = 'block';
  
    fetch( API_URL+'correo_notificacion.php', {
        method: 'POST',
        body: datos
    })
    // .then(res => res.json())
   .then(res => {
    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json(); // Si la respuesta es correcta, conviértela a JSON
})
    .then(data => {
        console.log(data);
        document.getElementById('spinner').style.display = 'none';
        if (data.success) {
            Swal.fire({
                title: 'Enviado',
                text: data.mensaje,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: data.mensaje,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    })
    .catch(error => {
        console.error('Error al procesar la solicitud:', error.message);
        document.getElementById('spinner').style.display = 'none';
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al procesar la solicitud: ${error.message} Por favor, intenta nuevamente más tarde.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });
}

document.getElementById('btnEnviar').addEventListener('click', function (e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    console.log('hola');
    notificacion();
});


