// Supongamos que este array viene de una consulta a la base de datos
const alumnos = [
    { id: 1, name: "Leon Scott Kennedy" },
    { id: 2, name: "Doom Slayer" },
    { id: 3, name: "Hades" },
    { id: 4, name: "Cuphead" },
    { id: 5, name: "Claire Redfield" },
    { id: 6, name: "Link" }
];

// Referencia al cuerpo de la tabla
const tbody = document.getElementById('alumnos-body');

// Generar filas dinámicamente
alumnos.forEach(alumno => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${alumno.name}</td>
        <td>
            <input type="checkbox" class="checkbox" value="${alumno.id}" data-name="${alumno.name}">
        </td>
    `;
    tbody.appendChild(row);
});


/* fucniones de los botones  */

// Marcar todos los checkboxes
document.querySelector('.btn-green').addEventListener('click', () => {
    document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.checked = true;
    });
});

// Desmarcar todos los checkboxes
document.querySelector('.btn-yellow').addEventListener('click', () => {
    document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
});

// Mostrar los seleccionados
document.querySelector('.btn-check').addEventListener('click', () => {
    const seleccionados = [];
    document.querySelectorAll('.checkbox:checked').forEach(checkbox => {
        seleccionados.push({
            id: checkbox.value,
            name: checkbox.dataset.name
        });
    });

    console.log("Seleccionados:", seleccionados);
    alert(
        seleccionados.length
            ? seleccionados.map(al => `ID: ${al.id}, Nombre: ${al.name}`).join("\n")
            : "No hay alumnos seleccionados"
    );
});
