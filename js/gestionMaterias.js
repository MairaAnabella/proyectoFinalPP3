//URL -> servidor aws 
const API_URL = 'http://3.83.173.143/backend/';


//const API_URL = 'http://localhost/backend/';
const filasPorPagina = 10; // número de filas por página
let paginaActual = 1;


function cargarCursos() {
  fetch(API_URL + 'gestionCursos.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      accion: 'obtenerCursos',


    })
  })
    .then(response => response.json())
    .then(cursos => {
      var selectCurso = document.getElementById('curso');
      selectCurso.innerHTML = '<option value="">Seleccione un curso</option>';
      for (var i = 0; i < cursos.length; i++) {
        var option = document.createElement('option');
        option.value = cursos[i].idCurso;
        option.textContent = cursos[i].nombre;
        selectCurso.appendChild(option);
      }
    });


}



/* function eliminarMateria(idMateria) {
  console.log(idMateria)
  Swal.fire({
    title: "¿Estas seguro de eliminar la materia?",
    text: "Una vez aceptado se eliminara de la tabla",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si,Claro!",
    allowOutsideClick: false // Evita que se cierre al hacer clic fuera
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(API_URL + 'gestionMaterias.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          accion: 'eliminarMateria',
          idMateria: idMateria
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al eliminar la Materia');
          }
          return response.json();
        })
        .then(data => {
          if (data.status === 'success') {

            Swal.fire({
              title: "Eliminado!",
              text: "La materia fue eliminada!",
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
 */


/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */

// función para cargar los datos
fetch(API_URL + 'gestionMaterias.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    accion: 'obtenerMaterias'
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
            <td id='idMateria'>${item.idMateria}</td>
            <td>${item.nombre}</td>
            <td>${item.fecha_creacion}</td>
            <td>${item.fecha_actualizacion}</td>
             <td>
               
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editarModal" onclick="selectedId = ${item.idMateria}"><i class='bx bx-edit-alt'></i></button>
                <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#unirModal" onclick="setModalData(${item.idMateria}, '${item.nombre}')"><i class='bx bx-add-to-queue'></i></button>
            </td>
        `;
      tbody.appendChild(tr);
    });
    /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

    //CONSULTA EDITAR MATERIA
    document.getElementById('editarModal').addEventListener('shown.bs.modal', function () {
      // Obtener el ID de la materia seleccionada
      let idMateria = selectedId;
     

      // Realizar solicitud AJAX para obtener los datos de la materia
      fetch(API_URL + 'gestionMaterias.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          accion: 'obtenerMateria',
          idMateria: idMateria
        })
      })
        .then(response => response.json())
        .then(data => {
          // Rellenar el formulario con los datos de la materia
          document.getElementById('materia-edit').value = data.nombre;

          document.getElementById('btnEditar').onclick = function () {
            let nombreMateria = document.getElementById('materia-edit').value;
            
            fetch(API_URL + 'gestionMaterias.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: new URLSearchParams({
                accion: 'editarMateria',
                idMateria: idMateria,
                nombreMateria: nombreMateria
              })
            })
              .then(response => response.json())
              .then(data => {
                if (data.status === 'success') {
                  Swal.fire({
                    title: "Se realizo el cambio con exitó!",
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
                      localStorage.removeItem('idMateria');    // Borra todos los datos del localStorage
                      location.reload();       // Refresca la página
                    }
                  });
                }
              });

          }

        });
    });

    /* --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
    let idMateria = null;  // Definir como variable global
    let nombreMateria = null;  // Definir como variable global

    window.setModalData = function (id, nombre) {
      idMateria = id;
      nombreMateria = nombre;

    };




    //CONSULTA PARA AGREGAR MATERIA A CURSOS
    document.getElementById('unirModal').addEventListener('shown.bs.modal', function () {
      // Obtener el ID de la materia seleccionada

      cargarCursos();

      document.getElementById('materia-add').value = nombreMateria;
      if (document.getElementById('materia-add')) {
        document.getElementById('materia-add').disabled = true; // Deshabilitar el input si tiene valor
      }

      document.getElementById('btnAgregar').onclick = function () {
        let idCurso = document.getElementById('curso').value;
        // Realizar solicitud AJAX para obtener los datos de la materia
        fetch(API_URL + 'gestionMaterias.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            accion: 'agregarMateriasCurso',
            idMateria: idMateria,
            idCurso: idCurso

          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              Swal.fire({
                title: "Se agrego la materia: " + nombreMateria + " al curso con exitó!",
                width: 600,
                padding: "3em",
                color: "#fd7e14",
                backdrop: `
                rgba(223, 124, 11, 0.616)
                left top
                no-repeat
              `

              }).then((result) => {
                if (result.isConfirmed) {

                  location.reload();       // Refresca la página
                }
              });
            }
          });
      }
    });


    /* -------------------------------------------------------------------------------------------------------------------------------------------- */

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









