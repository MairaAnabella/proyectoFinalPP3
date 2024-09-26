

/* Sí, la solución anterior sigue siendo válida para obtener el ID de la materia cuando se abre el modal, y puedes utilizarlo al hacer clic en el botón "Guardar cambios" 
(#btnEditar). Aquí te explico cómo integrar ambas funcionalidades:

Captura el ID al abrir el modal: Como ya se mencionó, puedes usar el evento show.bs.modal para capturar el ID cuando se abre el modal.

Asignar el ID al botón "Guardar cambios": Luego, en el momento en que se hace clic en el botón "Guardar cambios" (#btnEditar), puedes acceder al ID previamente 
capturado y ejecutar la función de edición.

Paso a paso
1. Modifica el botón que abre el modal:
Agrega el atributo data-id con el ID de la materia.

html
Copiar código */
<button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editarModal" data-id="${item.id}"><i class='bx bx-edit-alt'></i></button>
/* 2. Captura el ID al abrir el modal:
Utiliza el evento show.bs.modal para capturar el ID y almacenarlo en un campo oculto o directamente en una variable que puedas usar después.
 */
/* javascript
Copiar código */
const editarModal = document.getElementById('editarModal');
let idMateria; // Variable global para almacenar el ID de la materia

editarModal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget; // Botón que activó el modal
    idMateria = button.getAttribute('data-id'); // Extrae el data-id del botón
    // Aquí puedes actualizar los campos del modal según el ID si lo deseas
});
/* 3. Implementa la función del botón "Guardar cambios":
Usa el ID capturado (idMateria) cuando se haga clic en el botón "Guardar cambios" (#btnEditar). */

/* javascript
Copiar código */
document.getElementById('btnEditar').addEventListener('click', function() {
    if (idMateria) {
        // Aquí puedes hacer una llamada AJAX para guardar los cambios o realizar otra acción
        console.log('ID de la materia a editar:', idMateria);
        // Aquí podrías obtener los nuevos datos del formulario/modal
        // let nuevoNombre = document.getElementById('inputNombre').value;
        // let nuevaFecha = document.getElementById('inputFecha').value;

        // Realiza la acción de actualización (ej. enviar datos al servidor)
        editarMateria(idMateria);
    } else {
        console.log('No se encontró un ID de materia válido.');
    }
});

function editarMateria(idMateria) {
    // Función que realiza la lógica de edición, por ejemplo, una petición AJAX para actualizar la materia
    alert('Editando la materia con ID: ' + idMateria);
    // Aquí puedes hacer una llamada al backend o actualizar la tabla
}
/* ¿Cómo funciona?
Al abrir el modal, el evento show.bs.modal captura el ID de la materia a través del atributo data-id y lo almacena en una variable (idMateria).
Cuando se hace clic en "Guardar cambios", la variable idMateria ya contiene el ID de la materia actual. Puedes usar este ID para realizar la lógica de edición,
 como hacer una solicitud AJAX para actualizar la materia en el servidor.
Opcional: Población de datos en el modal
Si quieres que el modal se llene con los datos actuales de la materia (por ejemplo, nombre, fecha, etc.), puedes hacerlo dentro del evento show.bs.modal:

javascript
Copiar código */
editarModal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    idMateria = button.getAttribute('data-id');

    // Simulación de carga de datos (puedes obtenerlos de tu array o mediante AJAX)
    const nombre = 'Nombre de la materia ' + idMateria; // Ejemplo de carga de datos
    const fechaCreacion = '2024-09-01'; // Ejemplo de fecha

    // Llena los campos del modal con los datos existentes
    document.getElementById('inputNombre').value = nombre;
    document.getElementById('inputFechaCreacion').value = fechaCreacion;
});
/* Conclusión
Con esta solución, podrás obtener el ID de la materia al abrir el modal y usarlo al hacer clic en el botón "Guardar cambios", lo que te permitirá editar el registro correspondiente. Si además quieres 
cargar los datos actuales de la materia en el modal, puedes hacerlo en el mismo evento. */