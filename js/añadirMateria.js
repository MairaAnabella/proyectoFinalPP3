//URL -> servidor aws 
const API_URL = 'http://3.83.173.143/backend/';


/* const API_URL = "http://localhost/backend-laburo/"; */

document.addEventListener("DOMContentLoaded", function () {

  /* ocultar botones segun rol */
  var btnEstudiantes = document.getElementById("btnEstudiantes");
  var btnUser = document.getElementById("btnUser");
  var btnMaterias = document.getElementById("btnMaterias");
  var btnCursos = document.getElementById("btnCursos");
  var btnComunicados = document.getElementById("btnComunicados");
  /* sub menu administrador */
  var submenuAdmiCalificaciones = document.getElementById(
    "subMenuAdmiCalificacion"
  );
  var submenuAdmiAsistencia = document.getElementById(
    "subMenuAdmiAsistencia"
  );
  /* sub menu tutores */
  var submenuPadreCalificacion = document.getElementById(
    "subMenuPadreCalificacion"
  );
  var submenuPadreAsistencia = document.getElementById(
    "subMenuPadreAsistencia"
  );
  var footer=document.getElementById('footer');
  console.log(rol);
  if (rol == 4) {
    footer.style.marginTop='5%'; 
    btnEstudiantes.style.display = "none";
    btnUser.style.display = "none";
    btnMaterias.style.display = "none";
    btnCursos.style.display = "none";
    btnComunicados.style.display = "none";
   
    /* sub menu */
    submenuAdmiAsistencia.style.display = "none";
    submenuAdmiCalificaciones.style.display = "none";
  } else {  
    submenuPadreAsistencia.style.display = "none";
    submenuPadreCalificacion.style.display = "none";
  }

});


const boton = document.getElementById('btn-enviar');
boton.addEventListener('click', function () {

  let materia = document.getElementById('agregarMateria').value;
  fetch(API_URL + 'gestionMaterias.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      accion: 'agregarMateria',
      nombreMateria: materia

    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        Swal.fire({
          title: "La materia: " + materia + " ha sido añadido exitosamente y esta disponible para los usuarios",
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

