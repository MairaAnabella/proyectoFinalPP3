// URL del servidor (local o AWS)
/* const API_URL = "http://localhost/backend-laburo/"; */ // Cambia a 'http://3.83.173.143/backend/' en producción
const API_URL = 'http://3.83.173.143/backend/';
// Seleccionar los elementos del DOM
const cursoSelect = document.getElementById("curso");
const estudianteSelect = document.getElementById("estudiante");
const materiasContainer = document.querySelector(".materias");
const btnAñadir = document.getElementById("btn-añadir");


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

// Cargar estudiantes cuando se selecciona un curso
cursoSelect.addEventListener("change", () => {
  const cursoId = cursoSelect.value;

  if (!cursoId) {
    estudianteSelect.innerHTML =
      '<option value="">Seleccione un estudiante</option>';
    estudianteSelect.disabled = true;
    return;
  }

  fetch(API_URL + "subirCalificacion.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      accion: "obtenerEstudiantes",
      idCurso: cursoId,
    }),
  })
    .then((response) => response.json())
    .then((estudiantes) => {
      estudianteSelect.innerHTML =
        '<option value="">Seleccione un estudiante</option>';
      estudiantes.forEach((estudiante) => {
        const option = document.createElement("option");
        option.value = estudiante.idAlumno;
        option.textContent = `${estudiante.nombre} ${estudiante.apellido}`;
        estudianteSelect.appendChild(option);
      });
      estudianteSelect.disabled = false;
    })
    .catch((error) => {
      console.error("Error al cargar los estudiantes:", error);
      estudianteSelect.disabled = true;
    });
});

// Cargar materias cuando se selecciona un estudiante
estudianteSelect.addEventListener("change", () => {
  const estudianteId = estudianteSelect.value;
  const cursoId = cursoSelect.value;

  if (!estudianteId || !cursoId) {
    materiasContainer.innerHTML = ""; // Limpia las materias si no hay selección
    return;
  }

  fetch(API_URL + "subirCalificacion.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      accion: "obtenerMaterias",
      idCurso: cursoId,
    }),
  })
    .then((response) => response.json())
    .then((materias) => {
      materiasContainer.innerHTML = ""; // Limpia el contenedor de materias

      // Crear campos de entrada para cada materia
      materias.forEach((materia) => {
        const materiaDiv = document.createElement("div");
        materiaDiv.classList.add("form-group");

        const label = document.createElement("label");
        label.textContent = materia.nombre;

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Ingrese calificación";
        input.dataset.materiaId = materia.idMateria; // Agregar el ID de la materia al input

        materiaDiv.appendChild(label);
        materiaDiv.appendChild(input);
        materiasContainer.appendChild(materiaDiv);
      });
    })
    .catch((error) => {
      console.error("Error al cargar las materias:", error);
    });
});

// Evento click para el botón "Añadir"
btnAñadir.addEventListener("click", async () => {
  const estudianteId = estudianteSelect.value;
  const cursoId = cursoSelect.value;

  if (!estudianteId || !cursoId) {
    alert("Por favor selecciona un curso y un estudiante.");
    return;
  }

  // Recoger todas las materias e IDs con sus calificaciones
  const inputs = document.querySelectorAll(".materias input"); // Seleccionar todos los inputs de materias
  const calificaciones = [];

  inputs.forEach((input) => {
    const materiaId = input.dataset.materiaId; // Obtener el ID de la materia del atributo data-materiaId
    const calificacion = input.value;
    console.log(materiaId, calificacion); // Para depurar los valores

    // Verificar si el campo tiene valor antes de añadirlo al array
    if (calificacion) {
      calificaciones.push({
        materiaId: materiaId,
        calificacion: calificacion,
      });
    }
  });

  // Verificar si hay calificaciones que guardar
  if (calificaciones.length > 0) {
    try {
      const response = await fetch(API_URL + "subirCalificacion.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          accion: "guardarCalificaciones",
          idAlumno: estudianteId,
          calificaciones: JSON.stringify(calificaciones), // Convertimos el array de calificaciones en un JSON
        }),
      });

      const result = await response.json();
      console.log(result);
      if (result.status === "success") {
        Swal.fire({
          title:
            "Se cargo  correctamente las calificaciones",
          width: 600,
          padding: "3em",
          color: "#fd7e14",
          backdrop: `
      rgba(223, 124, 11, 0.616)
      left top
      no-repeat
    `,
        }).then((result) => {
          if (result.isConfirmed) {
            
           
            location.reload(); // Refresca la página
          }
        });
      }
    } catch (error) {
      console.error("Error al guardar calificaciones:", error);
    }
  }
});
