// URL del servidor (local o AWS)
const API_URL = 'http://3.83.173.143/backend/';
/* const API_URL = "http://localhost/backend-laburo/"; */// Cambia a 'http://3.83.173.143/backend/' en producción
const alumnoSelect = document.getElementById("alumno");


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

function formatearFecha(fechaStr) {
  const fecha = new Date(fechaStr);
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`; // ejemplo: "11/11/2024"
}

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


    fetch(API_URL + "reporteAsistenciaTutor.php" ,{
        method:"POST",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body:new URLSearchParams({
            accion:"reporte",
            idAlumno:alumnoId,
        }),
    })
    .then((response)=>response.json())
    .then((asitencias)=>{
        const tableBody = document.querySelector("#asistenciaTable tbody");
       

        console.log(asitencias)
        // Verifica que el elemento exista antes de usarlo
        if (!tableBody) {
          console.error('No se encontró el tbody de la tabla.');
          return;
        }
  
        tableBody.innerHTML = ""; // Limpia el contenido existente
  
        if (!asitencias.length) {
          tableBody.innerHTML = "<tr><td colspan='2'>No se encontraron datos.</td></tr>";
          return;
        }
  
  
  
        // Itera sobre los alumnos y crea las filas
        asitencias.forEach((asistencia) => {
            console.log(asistencia)
          const row = document.createElement("tr");
          
          if(asistencia.fecha === null){
            fechaBajaFormat='--/--/----'
    
           }else{
            fechaFormat=formatearFecha(asistencia.fecha);
           }
          

  
          row.innerHTML = `
            <td>${asistencia.nombreCompleto}</td>
            <td>${fechaFormat}</td>
            <td>${asistencia.estadoAsistencia}</td>
          `;
  
          tableBody.appendChild(row);
  
        });
  
    })
})
