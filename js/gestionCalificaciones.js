//URL -> servidor aws 
//const API_URL = 'http://3.83.173.143/backend/';


const API_URL = 'http://localhost/backend/';
const filasPorPagina = 15; // número de filas por página
let paginaActual = 1;


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
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
            <td>${item.idAlumno}</td>
            <td>${item.nombre+' '+item.apellido}</td>
            <td>${item.descripcionCurso}</td>
            <td>${item.descripcionEstados}</td>      
            <td>${item.fechaAlta}</td>
            
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
      document.getElementById('curso').value = data.descripcionCurso ;

      document.getElementById('btnEditar').onclick = function () {
       
        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let dni= document.getElementById('dni').value;
        let curso= document.getElementById('curso').value;
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
            curso:curso, 
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
