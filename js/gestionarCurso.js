//URL -> servidor aws 
//const API_URL = 'http://3.83.173.143/backend/';


const API_URL = 'http://localhost/backend/';
const filasPorPagina = 6; // número de filas por página
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








// función para cargar los datos

fetch(API_URL + 'gestionCursos.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    accion: 'obtenerCursos'
  })
})
  .then(response => response.json())
  .then(data => {
    const tabla = document.getElementById('tabla');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = ''; // Limpia la tabla

    data.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
            <td>${item.idCurso}</td>
            <td>${item.nombre}</td>
            <td>${item.fecha_creacion}</td>
             <td>
               
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editarModal" onclick="selectedId = ${item.idCurso}"><i class='bx bx-edit-alt'></i></button>
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

//CONSULTA EDITAR CURSO
document.getElementById('editarModal').addEventListener('shown.bs.modal', function () {
  // Obtener el ID de la materia seleccionada
  let idCurso = selectedId;


  // Realizar solicitud AJAX para obtener los datos de la materia
  fetch(API_URL + 'gestionCursos.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      accion: 'obtenerCurso',
      idCurso: idCurso
    })
  })
    .then(response => response.json())
    .then(data => {
      // Rellenar el formulario con los datos de la materia
      document.getElementById('nombreCurso').value = data.nombre;

      document.getElementById('btnEditar').onclick = function () {
        let nombreCurso = document.getElementById('nombreCurso').value;

        fetch(API_URL + 'gestionCursos.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            accion: 'editarCuso',
            idCurso: idCurso,
            nombreCurso: nombreCurso
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
