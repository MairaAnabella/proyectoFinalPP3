// URL del servidor
const API_URL = 'http://3.83.173.143/backend/';

// Función para limpiar los campos del formulario
function limpiarFormulario() {
  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value = '';
  document.getElementById('dni').value = '';
  document.getElementById('fechaNac').value = '';
  document.getElementById('tutor').value = '';
  document.getElementById('curso').value = '';
}


/* LLENAR SELECT DE CURSO Y TUTOR */
document.addEventListener("DOMContentLoaded", function() {
  fetch(API_URL + 'datosSelectEstudiante.php')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const tutorSelect = document.getElementById('tutor');
      data.tutores.forEach(tutor => {
        const option = document.createElement('option');
        option.value = tutor.idUser;
        option.textContent = tutor.nombre + ' ' + tutor.apellido;
        tutorSelect.appendChild(option);
      });

      const cursoSelect = document.getElementById('curso');
      data.cursos.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.idCurso;
        option.textContent = curso.nombre;
        cursoSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error:', error));
});

/* AGREGAR ESTUDIANTE */


const botonAñadir = document.getElementById('btn-enviar');
botonAñadir.addEventListener('click', function () {
  let nombre = document.getElementById('nombre').value;
  let apellido = document.getElementById('apellido').value;
  let dni = document.getElementById('dni').value;
  let fechaNac = document.getElementById('fechaNac').value;
  let tutor = document.getElementById('tutor').value;
  let curso = document.getElementById('curso').value;

  const alumno = {
    nombre: nombre,
    apellido: apellido,
    dni: dni,
    fechaNac: fechaNac,
    userId: tutor,
    cursoId: curso,
  };

  fetch(API_URL + 'agregarEstudiante.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(alumno)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Hubo un problema al agregar el estudiante');
      }
      return response.json();
    })
    .then(data => {
      if (data.status === 'success') {
        Swal.fire({
          title: '¡Éxito!',
          text: data.message || 'El estudiante se ha agregado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          limpiarFormulario(); // Llama a la función para limpiar los campos
        });
      } else if (data.status === 'error' && data.message === 'El DNI ya existe en el sistema.') {
        Swal.fire({
          title: 'DNI duplicado',
          text: 'El DNI ingresado ya está registrado en el sistema.',
          icon: 'warning',
          confirmButtonText: 'OK'
        }).then(() => {
          limpiarFormulario(); // Llama a la función para limpiar los campos
        });;
      } else {
        Swal.fire({
          title: 'Error',
          text: data.message || 'Hubo un problema al agregar el estudiante.',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {
          limpiarFormulario(); // Llama a la función para limpiar los campos
        });;
      }
    })
    .catch(error => {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
});
