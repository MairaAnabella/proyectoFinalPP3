//URL -> servidor aws 
const API_URL = 'http://3.83.173.143/backend/';


/* const API_URL = "http://localhost/backend-laburo/"; */
const filasPorPagina = 15; // número de filas por página
let paginaActual = 1;


function formatearFecha(fechaStr) {
  if (!fechaStr) return '--/--/----'; // Si la fecha es null o undefined, devuelve el formato vacío

  const partes = fechaStr.split('-'); // Divide la cadena "YYYY-MM-DD" en partes
  const fecha = new Date(partes[0], partes[1] - 1, partes[2]); // Crea la fecha ajustada a la zona horaria local

  // Verifica si la fecha es válida
  if (isNaN(fecha.getTime())) {
    return '--/--/----'; // Devuelve formato vacío si la fecha no es válida
  }

  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`; // Ejemplo: "11/11/2024"
}


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
// función para cargar los datos

fetch(API_URL + 'gestionCalificaciones.php', {
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

      const tr = document.createElement('tr');
      tr.innerHTML = `
            <td>${item.idAlumno}</td>
            <td>${item.nombre + ' ' + item.apellido}</td>
            <td>${item.descripcionCurso}</td>
            <td>${item.descripcionEstados}</td>      
            <td>${formatearFecha(item.fechaAlta)}</td>
            
             <td>
               
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editarModal" onclick="selectedId = ${item.idAlumno}"><i class='bx bx-edit-alt'></i></button>
        
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
document.getElementById('editarModal').addEventListener('shown.bs.modal', function () {
  // Obtener el ID de la materia seleccionada
  let idAlumno = selectedId;

  // Realizar solicitud AJAX para obtener los datos de la materia
  fetch(API_URL + 'gestionCalificaciones.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      accion: 'obtenerMateriasEstudianteSeleccionado',
      idAlumno: idAlumno,
    }),
  })
    .then((response) => response.json())
    .then((materias) => {
      // Seleccionar el contenedor donde se insertarán los elementos
      const materiasContainer = document.getElementById('materias');
      materiasContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar los elementos

      // Recorrer las materias y generar los elementos dinámicos
      materias.forEach((materia, index) => {
        const materiaDiv = document.createElement('div');
        materiaDiv.classList.add('form-group');

        // Crear el label con el nombre de la materia
        const label = document.createElement('label');
        label.setAttribute('for', `materia-${index}`); // Usar el índice para un ID único
        label.textContent = materia.nombre;

        // Crear el input con la nota
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `materia-${index}`;
        input.name = `materia-${index}`;
        input.value = materia.nota; // Asignar la nota como valor inicial
        input.dataset.materiaId = materia.idMateria; // Agregar el ID de la materia al input

        // Añadir los elementos al contenedor
        materiaDiv.appendChild(label);
        materiaDiv.appendChild(input);

        // Agregar al contenedor principal
        materiasContainer.appendChild(materiaDiv);
      });

      /* BOTON EDITAR */
      document.getElementById('btnEditar').onclick = function () {
        // Recoger todas las materias e IDs con sus calificaciones
        const inputs = document.querySelectorAll('#materias input'); // Seleccionar todos los inputs de materias
        const calificaciones = [];

        inputs.forEach((input) => {
          const materiaId = input.dataset.materiaId; // Obtener el ID de la materia del atributo data-materiaId
          const calificacion = input.value;

          if (calificacion) {
            calificaciones.push({
              materiaId: materiaId,
              calificacion: calificacion,
            });
          }
        });

        // Verificar si hay calificaciones que guardar
        if (calificaciones.length > 0) {
          fetch(API_URL + 'subirCalificacion.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              accion: 'actualizarCalificaciones',
              idAlumno: idAlumno,
              calificaciones: JSON.stringify(calificaciones), // Convertimos el array de calificaciones en un JSON
            }),
          })
            .then((response) => response.json()) // Procesar la respuesta
            .then((result) => {
              if (result.status === 'success') {
                // Mostrar alerta de éxito
                Swal.fire({
                  title: '¡Calificaciones actualizadas!',
                  text: 'Las calificaciones se han subido correctamente.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                }).then(() => {
                  location.reload(); // Recargar la página después de confirmar
                });
              } else {
                console.error('Error del servidor:', result.message);
              }
            })
            .catch((error) => {
              console.error('Error al guardar las calificaciones:', error);
            });
        }
      };
    })
    .catch((error) => {
      console.error('Error al obtener las materias:', error);
    });
});
