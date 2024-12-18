//URL -> servidor aws 
const API_URL = 'http://3.83.173.143/backend/';


/* const API_URL = "http://localhost/backend-laburo/"; */
const filasPorPagina = 10; // número de filas por página
let paginaActual = 1;

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



// Funcion cambia estado
function desactivar(id,estado){
  Swal.fire({
    title: "¿Estás seguro de que deseas desactivar la relación entre esta materia y el curso?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si,Claro!",
    cancelButtonText: 'Cancelar',
    allowOutsideClick: false // Evita que se cierre al hacer clic fuera
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(API_URL + 'administrarMateriaCurso.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          accion: 'cambioEstado',
          idRelacion: id,
          estado:estado
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al desactivar la Materia');
          }
          return response.json();
        })
        .then(data => {
          if (data.status === 'success') {

            Swal.fire({
              title: "Desactivado!",
              text: "La relación fue desactivada con exitó!",
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
    title: "¿Estás seguro de que deseas activar la relación entre esta materia y el curso?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si,Claro!",
    cancelButtonText: 'Cancelar',
    allowOutsideClick: false // Evita que se cierre al hacer clic fuera
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(API_URL + 'administrarMateriaCurso.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          accion: 'cambioEstado',
          idRelacion: id,
          estado:estado
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al activar la Materia');
          }
          return response.json();
        })
        .then(data => {
          if (data.status === 'success') {

            Swal.fire({
              title: "Activado!",
              text: "La relación fue activada con exitó!",
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




// función para cargar los datos

fetch(API_URL + 'administrarMateriaCurso.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    accion: 'obtenerMateriaCurso'
  })
})
  .then(response => response.json())
  .then(data => {
    const tabla = document.getElementById('tabla');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = ''; // Limpia la tabla

    data.forEach(item => {
      console.log(data)
      const tr = document.createElement('tr');
    /*   let estado='';
      

      if(item.estado == 1){
        estado='Activo';
      }else{
        estado='Inactivo'
      } */


      tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.nombreCurso}</td>
      <td>${item.nombreMateria}</td>
      <td>${item.descripcion}</td>
  
      <td>
          ${
              item.estado == 1 
              ? `<button class="btn btn-danger btn-sm"  onclick="desactivar(${item.id},${item.estado})">
                 <i class='bx bx-x'></i> </button>`
              : `<button class="btn btn-success btn-sm" onclick="activar(${item.id},${item.estado})">
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

