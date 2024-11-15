

//URL -> servidor aws 
//const API_URL = 'http://3.83.173.143/backend/';


const API_URL = 'http://localhost/backend/';














/* -------------------------------------------------------------------------------------------------------------------------------------- */
    /* AGREGAR CURSO */

    const botonAñadir=document.getElementById('btn-añadir');
    botonAñadir.addEventListener('click', function () {

        let curso = document.getElementById('nombreCurso').value;
        fetch(API_URL + 'gestionCursos.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            accion: 'agregarCurso',
            nombreCurso: curso
      
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              Swal.fire({
                title: "El curso: " + curso + " ha sido añadido exitosamente y esta disponible para los usuarios.",
                width: 600,
                padding: "3em",
                color: "#fd7e14",
                backdrop: `
              rgba(223, 124, 11, 0.616)
              left top
              no-repeat
            `
      
              }).then((result) => {
                if (result.isConfirmed) {  // Verifica si el usuario hizo clic en "OK"
                  // Borra todos los datos del localStorage
                  location.reload();       // Refresca la página
                }
              });
            }
      
          });
      
      })
      