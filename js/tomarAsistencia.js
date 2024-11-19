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
// Cargar estudiantes cuando se selecciona un curso
cursoSelect.addEventListener("change", () => {
    const cursoId = cursoSelect.value;
    const tbody = document.getElementById("alumnos-body");
  
    // Limpiar la tabla y reiniciar si cambia el curso
    tbody.innerHTML = "";
  
    if (!cursoId) {
      cursoSelect.value = ""; // Reinicia la selección
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
        // Agregar estudiantes a la tabla
        estudiantes.forEach((alumno) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${alumno.nombre + " " + alumno.apellido}</td>
            <td>
              <input type="checkbox" class="checkbox" value="${alumno.idAlumno}" data-name="${alumno.nombre + " " + alumno.apellido}">
            </td>
          `;
          tbody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Error al cargar los estudiantes:", error);
      });
  });
  

/* fucniones de los botones  */

// Deshabilitar la selección de cursos después de escoger uno
cursoSelect.addEventListener("change", () => {
    if (cursoSelect.value) {
      cursoSelect.disabled = true;
  
      // Mostrar botón para reiniciar
      const resetButton = document.createElement("button");
      resetButton.textContent = "Cambiar curso";
      resetButton.classList.add("btn", "btn-red");
      resetButton.addEventListener("click", () => {
        cursoSelect.disabled = false;
        cursoSelect.value = "";
        document.getElementById("alumnos-body").innerHTML = ""; // Limpiar tabla
        resetButton.remove();
      });
      document.querySelector(".inputs").appendChild(resetButton);
    }
  });
  

// Marcar todos los checkboxes
document.querySelector(".btn-green").addEventListener("click", () => {
  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.checked = true;
  });
});

// Desmarcar todos los checkboxes
document.querySelector(".btn-yellow").addEventListener("click", () => {
  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.checked = false;
  });
});


//Guardar las asistencias

document.getElementById("guardar").addEventListener("click", () => {
    console.log('hola');
    const cursoId = document.getElementById("curso").value;
    const fecha = document.getElementById("fecha-asistencia").value;

    if (!cursoId || !fecha) {
        Swal.fire("Error", "Debes seleccionar un curso y una fecha.", "error");
        return;
    }

    const asistencias = [];
    document.querySelectorAll(".checkbox").forEach((checkbox) => {
        asistencias.push({
            idAlumno: checkbox.value,
            asistencia: checkbox.checked ? 1 : 0, // 1 para true, 0 para false
        });
    });

    // Enviar datos al servidor
    fetch(API_URL + "subirAsistencia.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            accion: "guardarAsistencia",
            idCurso: cursoId,
            fecha: fecha,
            asistencias: asistencias,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if (data.success) {
                Swal.fire("Éxito", "Asistencias guardadas correctamente.", "success");
            } else {
                Swal.fire("Error", "Ocurrió un error al guardar las asistencias.", "error");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            Swal.fire("Error", "No se pudo conectar con el servidor.", "error");
        });
});






