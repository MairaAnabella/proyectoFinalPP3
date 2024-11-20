// URL del servidor (local o AWS)
const API_URL = "http://localhost/backend/"; // Cambia a 'http://3.83.173.143/backend/' en producción
const cursoSelect = document.getElementById("curso");

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
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;
  
    if (!cursoId || !fechaInicio || !fechaFin) {
      console.error("Faltan datos para la consulta (cursoId, fechaInicio o fechaFin).");
      return;
    }
  
    fetch(API_URL + "reporteAsistencias.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        accion: "reporte",
        idCurso: cursoId,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
      }),
    })
      .then((response) => response.json())
      .then((estudiantes) => {
        console.log("Datos recibidos:", estudiantes); // Depuración
  
        const tableBody = document.querySelector("#asistenciaTable tbody");
        tableBody.innerHTML = ""; // Vaciar la tabla antes de llenarla
  
        if (!estudiantes.length) {
          tableBody.innerHTML = "<tr><td colspan='4'>No se encontraron datos.</td></tr>";
          return;
        }
  
        estudiantes.forEach((estudiante) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${estudiante.nombre} ${estudiante.apellido}</td>
            <td>${estudiante.asistencias}</td>
            <td>${estudiante.faltas}</td>
            <td class="${parseFloat(estudiante.porcentajeAsistencias) >= 75 ? "regular" : "libre"}">
              ${estudiante.porcentajeAsistencias}
            </td>
          `;
          tableBody.appendChild(row);
        });
        
        
      })
      .catch((error) => {
        console.error("Error al cargar los estudiantes:", error);
        const tableBody = document.querySelector("#asistenciaTable tbody");
        tableBody.innerHTML = "<tr><td colspan='4'>Error al cargar los datos.</td></tr>";
      });

       // Limpiar los select y los input de fecha después de cargar los datos
       cursoSelect.value = ""; // Limpiar el select del curso
       document.getElementById("fechaInicio").value = ""; // Limpiar el input de fecha de inicio
       document.getElementById("fechaFin").value = ""; // Limpiar el input de fecha de fin
   
      
  });
  



