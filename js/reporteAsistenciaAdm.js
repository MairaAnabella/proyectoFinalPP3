// URL del servidor (local o AWS)
const API_URL = 'http://3.83.173.143/backend/';
//const API_URL = "http://localhost/backend-laburo/"; Cambia a 'http://3.83.173.143/backend/' en producción
const cursoSelect = document.getElementById("curso");

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


// Cargar los cursos cuando se carga la página
fetch(API_URL + "subirCalificacion.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    accion: "obtenerCursos",
  }),
})
  .then((response) => response.json())
  .then((cursos) => {
    cursoSelect.innerHTML = '<option value="">Seleccione un curso</option>';
    cursos.forEach((curso) => {
      const option = document.createElement("option");
      option.value = curso.idCurso;
      option.textContent = curso.nombre;
      cursoSelect.appendChild(option);
    });
  });
  cursoSelect.addEventListener("change", () => {
    const cursoId = cursoSelect.value;
    const fechaIni = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;
  
    fetch(API_URL + "reporteAsistencias.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        accion: "reporte",
        idCurso: cursoId,
        fechaInicio: fechaIni,
        fechaFin: fechaFin,
      }),
    })
      .then((response) => response.json())
      .then((asitencias) => {
        const tableBody = document.querySelector("#asistenciaTable tbody");
  
        // Verifica que el elemento exista antes de usarlo
        if (!tableBody) {
          console.error("No se encontró el tbody de la tabla.");
          return;
        }
  
        tableBody.innerHTML = ""; // Limpia el contenido existente
  
        if (!asitencias.length) {
          tableBody.innerHTML = "<tr><td colspan='4'>No se encontraron datos.</td></tr>";
          return;
        }
  
        // Itera sobre los alumnos y crea las filas
        asitencias.forEach((asistencia) => {
          const row = document.createElement("tr");
  
          // Formatear la fecha si es necesario
          const fechaFormat =
            asistencia.fecha === null ? "--/--/----" : formatearFecha(asistencia.fecha);
  
          // Agregar contenido de la fila
          row.innerHTML = `
            <td>${asistencia.nombre + " " + asistencia.apellido}</td>
            <td>${asistencia.asistencias}</td>
            <td>${asistencia.faltas}</td>
            <td class="porcentaje">${asistencia.porcentajeAsistencias}</td>
          `;
  
          // Seleccionar el <td> de porcentaje
          const tdPorcentaje = row.querySelector(".porcentaje");
  
          // Convertir el porcentaje a un número (eliminar % y convertir a número)
          const porcentaje = parseFloat(asistencia.porcentajeAsistencias.replace("%", ""));
  
          // Aplicar el color según el porcentaje
          if (porcentaje < 20) {
            tdPorcentaje.style.color = "red"; // Texto rojo
          } else {
            tdPorcentaje.style.color = "green"; // Texto verde
          }
  
          tableBody.appendChild(row);
        });
  
        // **Reiniciar inputs y select**
        cursoSelect.value = ""; // Reinicia el select
        document.getElementById("fechaInicio").value = ""; // Limpia input de fecha de inicio
        document.getElementById("fechaFin").value = ""; // Limpia input de fecha de fin
      })
      .catch((error) => {
        console.error("Error al obtener el reporte:", error);
      });
  });
  