//URL -> servidor aws 
const API_URL = 'http://3.83.173.143/backend/';


/* const API_URL = "http://localhost/backend-laburo/"; */
const filasPorPagina = 15; // número de filas por página
let paginaActual = 1;

/* 

function eliminarCurso(idCurso) {
  Swal.fire({
    title: "¿Estás seguro de eliminar este Curso?",
    text: "Una vez aceptado, se eliminará de la tabla.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "¡Sí, claro!",
    allowOutsideClick: false // Evita que se cierre al hacer clic fuera
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(API_URL + 'gestionCursos.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          accion: 'eliminarCurso',
          idCurso: idCurso
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al eliminar el Curso.');
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          Swal.fire({
            title: "¡Eliminado!",
            text: "El curso fue eliminado correctamente.",
            icon: "success",
            allowOutsideClick: false // Evita cerrar al hacer clic fuera del modal
          }).then(() => {
            // Recargar la página cuando el usuario haga clic en "OK"
            window.location.reload(); 
          });
        }
      })
      .catch(error => {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar la materia.",
          icon: "error"
        });
      });
    }
  });
}
 */




// Funcion cambia estado
function desactivar(id,estado){
  Swal.fire({
    title: "¿Estás seguro de que deseas dar de baja al estudiante seleccionado?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si,Claro!",
    allowOutsideClick: false // Evita que se cierre al hacer clic fuera
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(API_URL + 'gestionEstudiante.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          accion: 'cambioEstado',
          idEstudiante: id,
          estado:estado
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema en dar de baja al estudiante');
          }
          return response.json();
        })
        .then(data => {
          if (data.status === 'success') {

            Swal.fire({
              title: "Desactivado!",
              text: "Se dio de baja correctamente al estudiante!",
              icon: "success",
              allowOutsideClick: false
            }).then(() => {
              // Recargar la página cuando el usuario haga clic en "OK"
              window.location.reload(); 
            });
          }
        });




    }
  });
}


// Funcion cambia estado
function activar(id,estado){
  Swal.fire({
    title: "¿Estás seguro de que deseas dar de alta al estudiante seleccionado?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si,Claro!",
    allowOutsideClick: false // Evita que se cierre al hacer clic fuera
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(API_URL + 'gestionEstudiante.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          accion: 'cambioEstado',
          idEstudiante: id,
          estado:estado
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al activar el estudiante');
          }
          return response.json();
        })
        .then(data => {
          if (data.status === 'success') {

            Swal.fire({
              title: "Activado!",
              text: "El usuario fue activado con exitó!",
              icon: "success",
              allowOutsideClick: false
            }).then(() => {
              // Recargar la página cuando el usuario haga clic en "OK"
              window.location.reload(); 
            });
          }
        });




    }
  });
}




function formatearFecha(fechaStr) {
  if (!fechaStr) return '--/--/----'; // Si la fecha es null o undefined, devuelve el formato vacío

  const fecha = new Date(fechaStr);
  
  // Verifica si la fecha es válida
  if (isNaN(fecha.getTime())) {
    return '--/--/----'; // Devuelve formato vacío si la fecha no es válida
  }

  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`; // Ejemplo: "11/11/2024"
}



// función para cargar los datos

fetch(API_URL + 'gestionEstudiante.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    accion: 'obtenerEstudiantes'
  })
})
  .then(response => response.json())
  .then(data => {
    const tabla = document.getElementById('tabla');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = ''; // Limpia la tabla
    console.log(data)
    data.forEach(item => {
      let userMod='';
      if(item.usuarioMod==null){
        userMod='--'
      }else{
        userMod=item.usuarioMod;
      }
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
            <td>${item.idAlumno}</td>
            <td>${item.nombre}</td>
            <td>${item.apellido}</td>
            <td>${item.dni}</td>
            <td>${formatearFecha(item.fechaNacimiento)}</td>
            <td>${item.nombreTutor + ' '+item.apellidoTutor}</td>
            <td>${item.calle}</td>
            <td>${item.numero}</td>
            <td>${item.localidad}</td>
            <td>${item.provincia}</td>
            <td>${item.descripcionCurso}</td>
            <td>${item.descripcionEstados}</td>      
            <td>${formatearFecha(item.fechaAlta)}</td>
            <td>${formatearFecha(item.fechaModificacion)}</td>
            <td>${userMod}</td>
             <td>
               
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editarModal" onclick="selectedId = ${item.idAlumno}"><i class='bx bx-edit-alt'></i></button>
                          ${
              item.estado == 1 
              ? `<button class="btn btn-danger btn-sm"  onclick="desactivar(${item.idAlumno},${item.estado})">
                 <i class='bx bx-x'></i> </button>`
              : `<button class="btn btn-success btn-sm" onclick="activar(${item.idAlumno},${item.estado})">
                   <i class='bx bx-check'></i></button>`
          }
            </td>
        `;
      tbody.appendChild(tr);
    });





    // crea el paginador
    const paginador = document.getElementById('paginador');
    paginador.innerHTML = '';
    const filas = tabla.querySelectorAll('tbody tr');
    const numPaginas = Math.ceil(filas.length / filasPorPagina);
    for (let i = 1; i <= numPaginas; i++) {
      const boton = document.createElement('button');
      boton.textContent = i;
      boton.addEventListener('click', () => {
        paginaActual = i;
        mostrarPagina(paginaActual);
      });
      paginador.appendChild(boton);
    }

    // función para mostrar una página
    function mostrarPagina(pagina) {
      const inicio = (pagina - 1) * filasPorPagina;
      const fin = inicio + filasPorPagina;
      const filas = tabla.querySelectorAll('tbody tr');

      filas.forEach((fila, indice) => {
        if (indice >= inicio && indice < fin) {
          fila.style.display = 'table-row';
        } else {
          fila.style.display = 'none';
        }
      });
    }

    mostrarPagina(paginaActual);

    // buscador
    const buscador = document.getElementById('buscador');
    buscador.addEventListener('input', () => {
      const textoBusqueda = buscador.value.toLowerCase();
      const filas = tabla.querySelectorAll('tbody tr');

      if (textoBusqueda === '') {
        // Restaurar estilo original
        filas.forEach((fila) => {
          fila.style.display = '';
        });
        mostrarPagina(paginaActual);
      } else {
        filas.forEach((fila) => {
          const textoFila = fila.textContent.toLowerCase();
          if (textoFila.includes(textoBusqueda)) {
            fila.style.display = 'table-row';
          } else {
            fila.style.display = 'none';
          }
        });
      }
    });
  });



/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

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

  
    })
    .catch(error => console.error('Error:', error));
});




//CONSULTA EDITAR ESTUDIANTE
document.getElementById('editarModal').addEventListener('shown.bs.modal', function () {
  // Obtener el ID de la materia seleccionada
  let idEstudiante = selectedId;



  // Realizar solicitud AJAX para obtener los datos de la materia
  fetch(API_URL + 'gestionEstudiante.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      accion: 'obtenerEstudianteSeleccionado',
      idEstudiante: idEstudiante
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // Rellenar el formulario con los datos de la materia
      document.getElementById('nombre').value = data.nombre;
      document.getElementById('apellido').value = data.apellido;
      document.getElementById('dni').value = data.dni;
      document.getElementById('fechaNac').value = data.fechaNacimiento;
      document.getElementById('direccion').value = data.calle +' '+ data.numero;
      document.getElementById('ciudad').value = data.localidad +', '+ data.provincia;
      document.getElementById('tutor').value = data.nombreTutor +' '+ data.apellidoTutor ;
     

      document.getElementById('btnEditar').onclick = function () {
       
        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let dni= document.getElementById('dni').value;
     
        let fechaNac= document.getElementById('fechaNac').value;
        let userMod=localStorage.getItem('nombre') +' '+localStorage.getItem('apellido')

        fetch(API_URL + 'gestionEstudiante.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            accion: 'editarEstudiante',
            idEstudiante: idEstudiante,
            nombre:nombre,
            apellido:apellido,
            dni:dni,
            fechaNac:fechaNac,
      
            userMod:userMod
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              Swal.fire({
                title: "La modificación ha sido procesada correctamente. Todos los datos están actualizados.",
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

                  location.reload();       // Refresca la página
                }
              });
            }
          });

      }

    });
});
