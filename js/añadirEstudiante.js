

//URL -> servidor aws 
const API_URL = 'http://3.83.173.143/backend/';

/* 
const API_URL = "http://localhost/backend-laburo/"; */





/* LLENAR SELECT DE CURSO Y TUTOR */
document.addEventListener("DOMContentLoaded", function() {
  // Realizar la solicitud AJAX
  fetch(API_URL+'datosSelectEstudiante.php')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Llenar el select de tutores
      const tutorSelect = document.getElementById('tutor');
      data.tutores.forEach(tutor => {
        const option = document.createElement('option');
        option.value = tutor.idUser;
        option.textContent = tutor.nombre + ' '+ tutor.apellido;
        tutorSelect.appendChild(option);
      });

      // Llenar el select de cursos
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





/* -------------------------------------------------------------------------------------------------------------------------------------- */
    /* AGREGAR ESTUDIANTE */

    const botonAñadir=document.getElementById('btn-enviar');
    botonAñadir.addEventListener('click', function () {
      let nombre= document.getElementById('nombre').value;
      let apellido=document.getElementById('apellido').value;
      let dni=document.getElementById('dni').value;
      let fechaNac=document.getElementById('fechaNac').value;
      let tutor=document.getElementById('tutor').value;
      let curso=document.getElementById('curso').value;
 

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
        // Muestra el mensaje de éxito con SweetAlert
        Swal.fire({
          title: '¡Éxito!',
          text: 'El estudiante se ha agregado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Recarga la página después de que el usuario cierre la alerta
          location.reload();
        });
      })
      .catch(error => {
        // Muestra un mensaje de error con SweetAlert
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    })      