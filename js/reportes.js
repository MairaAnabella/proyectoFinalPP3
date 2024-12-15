
// URL del servidor (local o AWS)
const API_URL = 'http://3.83.173.143/backend/';
//const API_URL = "http://localhost/backend-laburo/"; // Cambia a 'http://3.83.173.143/backend/' en producción


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



const alumnoSelect = document.getElementById("alumno");
if (localStorage.getItem('rol') === '4') {
    const idUser = localStorage.getItem('userId');
  
    fetch(API_URL + 'reporteNotas.php', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        accion: "obtenerAlumnos",
        idUser: idUser || '', // Verifica que idUser no sea null
      })
    })
      .then((response) => response.json())
      .then((alumnos) => { // Tipamos la respuesta como un array de 'Alumno'
        alumnoSelect.innerHTML='<option value="">Seleccione un alumno</option>';
        alumnos.forEach((alumno) => {
            const option = document.createElement("option");
            option.value=alumno.idAlumno;
            option.textContent=alumno.nombreCompleto;
            alumnoSelect.appendChild(option);
            
        });

      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }

alumnoSelect.addEventListener("change",()=>{
    const alumnoId=alumnoSelect.value;


    fetch(API_URL + "reporteNotas.php" ,{
        method:"POST",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body:new URLSearchParams({
            accion:"reporte",
            idAlumno:alumnoId
        }),
    })
    .then((response)=>response.json())
    .then((notas)=>{
        const tableBody = document.querySelector("#calificacion-table tbody");
       

        console.log(notas)
        // Verifica que el elemento exista antes de usarlo
        if (!tableBody) {
          console.error('No se encontró el tbody de la tabla.');
          return;
        }
  
        tableBody.innerHTML = ""; // Limpia el contenido existente
  
        if (!notas.length) {
          tableBody.innerHTML = "<tr><td colspan='2'>No se encontraron datos.</td></tr>";
          return;
        }
  
        let totalNotas = 0;
  
        // Itera sobre los alumnos y crea las filas
        notas.forEach((nota) => {
            console.log(nota)
          const row = document.createElement("tr");
          document.getElementById('estudianteNombre').textContent=nota.nombreCompleto;
          document.getElementById('dni').textContent=nota.dni;
          document.getElementById('cursoAlumno').textContent=nota.curso;

  
          row.innerHTML = `
            <td>${nota.materia}</td>
            <td>${nota.nota !== null ? nota.nota : 0}</td>
          `;
  
          tableBody.appendChild(row);
  
          totalNotas += nota.nota; // Suma las notas para calcular el porcentaje
        });
  
        // Calcula el porcentaje promedio
        const porcentajePromedio = notas.length ? (totalNotas / notas.length).toFixed(2) : 0;
  
        // Crea la fila del porcentaje
        const porcentajeRow = document.createElement("tr");
        porcentajeRow.classList.add("percentage-row");
        porcentajeRow.innerHTML = `
          <td >Porcentaje</td>
          <td>${porcentajePromedio}%</td>
        `;
        tableBody.appendChild(porcentajeRow);
    })
})


function getTableData() {
    const tableBody = document.querySelector("#calificacion-table tbody");
    const rows = tableBody.querySelectorAll("tr");
    const notas = [];
  
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      const materia = cells[0]?.textContent.trim();
      const calificacion = cells[1]?.textContent.trim();
  
      if (materia && calificacion) {
        notas.push({ materia, calificacion });
      }
    });
  
    return notas;
  }
  
  function downloadPDF() {
    const alumnoId = alumnoSelect.value; // El ID del alumno seleccionado
    const notas = getTableData(); // Los datos de la tabla
  
    if (!alumnoId || !notas.length) {
        alert('Por favor, selecciona un alumno y asegúrate de que haya notas para generar el reporte.');
        return;
      }
      
      // Verifica los datos antes de enviarlos
      console.log('Datos a enviar:', { alumnoId, notas });
      
      // Enviar los datos al servidor para generar el PDF
      fetch(API_URL + 'pdfReporteNotas.php', {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          accion: 'generarPDF', // Acción para generar el PDF
          alumnoId: alumnoId,
          notas: JSON.stringify(notas), // Convertir el array de notas en un string JSON
        })
      })
        .then(response => response.blob()) // Obtiene el PDF como Blob
        .then(blob => {
          // Crea un enlace temporal para la descarga
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'pdfReporteNotas.pdf'; // Nombre del archivo PDF
          link.click(); // Simula un clic para descargar el archivo
        })
        .catch(error => {
          console.error('Error al generar el PDF:', error);
        });}
  


