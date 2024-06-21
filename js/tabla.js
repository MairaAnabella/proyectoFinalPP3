// Datos iniciales

const datosIniciales = [

    {
        id: 1,
        apellido: "González",
        nombre: "Juan",
        email: "juan.gonzalez@example.com",
        contraseña: "contraseña123",
        fechaAlta: "2023-01-01",
        fechaBaja: null,
        rol: "tutor"
      },
      {
        id: 2,
        apellido: "Martínez",
        nombre: "Laura",
        email: "laura.martinez@example.com",
        contraseña: "contraseña456",
        fechaAlta: "2023-02-15",
        fechaBaja: null,
        rol: "Administrador"
      },
      {
        id: 3,
        apellido: "Rodríguez",
        nombre: "Carlos",
        email: "carlos.rodriguez@example.com",
        contraseña: "contraseña789",
        fechaAlta: "2023-03-01",
        fechaBaja: null,
        rol: "Directivo"
      },
      {
        id: 4,
        apellido: "López",
        nombre: "María",
        email: "maria.lopez@example.com",
        contraseña: "contraseña101112",
        fechaAlta: "2023-03-20",
        fechaBaja: null,
        rol: "Directivo"
      },
      {
        id: 5,
        apellido: "Pérez",
        nombre: "Ana",
        email: "ana.perez@example.com",
        contraseña: "contraseña131415",
        fechaAlta: "2023-04-10",
        fechaBaja: null,
        rol: "Administrador"
      },
      {
        id: 6,
        apellido: "García",
        nombre: "Miguel",
        email: "miguel.garcia@example.com",
        contraseña: "contraseña161718",
        fechaAlta: "2023-05-05",
        fechaBaja: null,
        rol: "tutor"
      },
      {
        id: 7,
        apellido: "Sánchez",
        nombre: "Elena",
        email: "elena.sanchez@example.com",
        contraseña: "contraseña192021",
        fechaAlta: "2023-06-15",
        fechaBaja: null,
        rol: "tutor"
      }


  
];

function cargarDatosIniciales() {
    let tabla = document.getElementById('tabla');
    datosIniciales.forEach(dato => {
        let fila = tabla.insertRow();
        let celda1 = fila.insertCell();
        let celda2 = fila.insertCell();
        let celda3 = fila.insertCell();
        let celda4 = fila.insertCell();
        let celda5 = fila.insertCell();
        let celda6 = fila.insertCell();
        let celda7 = fila.insertCell();
        let celda8 = fila.insertCell();
        let celda9 = fila.insertCell();

        celda1.innerHTML = '<button class="seleccionar" onclick="seleccionarFila(this)">Seleccionar</button>';
        celda2.textContent = dato.id;
        celda3.textContent = dato.nombre;
        celda4.textContent = dato.apellido;
        celda5.textContent = dato.email;
        celda6.textContent = dato.contraseña;
        celda7.textContent = dato.fechaAlta;
        celda8.textContent = dato.fechaBaja;
        celda9.textContent = dato.rol;
    });
}

// Precargar los datos
document.addEventListener('DOMContentLoaded', cargarDatosIniciales);



let seleccionado = null;
let contadorId = 1;



    
function agregar() {
    Swal.fire({
      title: 'Agregar nuevo Usuario',
      html: `
             <label for="fechaAlta">Nombre</label>
             <input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
             <label for="fechaAlta">Apellido</label>
             <input type="text" id="apellido" class="swal2-input" placeholder="Apellido">
             <label for="fechaAlta">Email</label>
             <input type="text" id="email" class="swal2-input" placeholder="Email">
             <label for="fechaAlta">Contraseña</label>
             <input type="password" id="contraseña" class="swal2-input" placeholder="Contraseña">
             <label for="fechaAlta">Fecha de Alta</label>
             <input type="date" id="fechaAlta" class="swal2-input">
             <select id="rol" class="swal2-input">
               <option value="">Selecciona un rol</option>
               <option value="Administrador">Administrador</option>
               <option value="Directivo">Directivo</option>
               <option value="Preceptor">Preceptor</option>
               <option value="Tutor">Tutor</option>
             </select>`,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'boton-personalizado', // Clase para el botón de confirmar
        cancelButton: 'boton-personalizado' // Clase para el botón de cancelar
      },
      showCancelButton: true, 
      focusConfirm: false,
      preConfirm: () => {
        const nombre = Swal.getPopup().querySelector('#nombre').value;
        const apellido = Swal.getPopup().querySelector('#apellido').value;
        const email = Swal.getPopup().querySelector('#email').value;
        const contraseña = Swal.getPopup().querySelector('#contraseña').value;
        const fechaAlta = Swal.getPopup().querySelector('#fechaAlta').value;
        const rol = Swal.getPopup().querySelector('#rol').value;

        // Validación de email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
          Swal.showValidationMessage(`Por favor ingresa un email válido`);
          return;
        }

         // Validación de contraseña segura
         const regexContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
         if (!regexContraseña.test(contraseña)) {
           Swal.showValidationMessage(`La contraseña debe tener al menos 8 caracteres, incluir números, letras mayúsculas y minúsculas, y caracteres especiales`);
           return;
         }

           // Verificación de que todos los campos estén llenos
        if (!nombre || !apellido || !email || !contraseña || !fechaAlta || !rol) {
            Swal.showValidationMessage(`Por favor ingresa todos los campos`);
            return;
          }

        return { nombre, apellido, email, contraseña, fechaAlta, rol };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        Swal.fire(
            '¡Agregado!',
            'Tu usuario ha sido creado',
            'success'
          )

        let tabla = document.getElementById('tabla');
        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = '<button class="seleccionar" onclick="seleccionarFila(this)">Seleccionar</button>';
        fila.setAttribute('id', `fila-${contadorId}`); // Usa contadorId para asignar un ID único
        fila.insertCell().innerHTML = contadorId;
        fila.insertCell().innerHTML = result.value.nombre;
        fila.insertCell().innerHTML = result.value.apellido;
        fila.insertCell().innerHTML = result.value.email;
        fila.insertCell().innerHTML = result.value.contraseña;
        fila.insertCell().innerHTML = result.value.fechaAlta;
        fila.insertCell().innerHTML = ''; // Para FechaBaja que es nula inicialmente
        fila.insertCell().innerHTML = result.value.rol;
  
        contadorId++; // Incrementa contadorId para el próximo uso
      }
    });
  }

function modificar() {

  let rolActual = seleccionado.cells[8].innerHTML;

  let opcionesRol = [
    { valor: "Administrador", texto: "Administrador" },
    { valor: "Directivo", texto: "Directivo" },
    { valor: "Preceptor", texto: "Preceptor" },
    { valor: "Tutor", texto: "Tutor" }
  ];
  
  let opcionesHTML = opcionesRol.map(opcion => 
    `<option value="${opcion.valor}" ${opcion.valor === rolActual ? 'selected' : ''}>${opcion.texto}</option>`
  ).join('');


if (seleccionado) {
Swal.fire({
    title: 'Modificar Usuario',
    html: `<input type="text" id="nombre" class="swal2-input" placeholder="Nombre" value="${seleccionado.cells[2].innerHTML}">
           <input type="text" id="apellido" class="swal2-input" placeholder="Apellido" value="${seleccionado.cells[3].innerHTML}">
           <input type="text" id="email" class="swal2-input" placeholder="Email" value="${seleccionado.cells[4].innerHTML}">
           <input type="password" id="contraseña" class="swal2-input" placeholder="Contraseña" value="${seleccionado.cells[5].innerHTML}">
           <input type="date" id="fechaAlta" class="swal2-input" placeholder="Fecha de Alta" value="${seleccionado.cells[6].innerHTML}">
           <input type="date" id="fechaBaja" class="swal2-input" placeholder="Fecha de Baja" value="${seleccionado.cells[7].innerHTML}">
             <select id="rol" class="swal2-input">${opcionesHTML}</select>`,
    confirmButtonText: 'Modificar',
    cancelButtonText: 'Cancelar',
    customClass: {
        confirmButton: 'boton-personalizado', // Clase para el botón de confirmar
        cancelButton: 'boton-personalizado' // Clase para el botón de cancelar
      },
    showCancelButton: true,
    focusConfirm: false,
    
    preConfirm: () => {
        const nombre = Swal.getPopup().querySelector('#nombre').value
        const apellido = Swal.getPopup().querySelector('#apellido').value
        const email = Swal.getPopup().querySelector('#email').value
        const contraseña = Swal.getPopup().querySelector('#contraseña').value
        const fechaAlta = Swal.getPopup().querySelector('#fechaAlta').value
        const fechaBaja = Swal.getPopup().querySelector('#fechaBaja').value
        const rol = Swal.getPopup().querySelector('#rol').value
        
        // Validación de email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
          Swal.showValidationMessage(`Por favor ingresa un email válido`);
          return;
        }

        // Verificación de que todos los campos estén llenos
        if (!nombre || !apellido || !email || !contraseña || !fechaAlta  || !rol) {
            Swal.showValidationMessage(`Por favor ingresa todos los campos`);
            return;
        }

        return { nombre, apellido, email, contraseña, fechaAlta, fechaBaja, rol }
    },

    
}).then((result) => {
    if (result.isConfirmed) {
        seleccionado.cells[2].innerHTML = result.value.nombre;
        seleccionado.cells[3].innerHTML = result.value.apellido;
        seleccionado.cells[4].innerHTML = result.value.email;
        seleccionado.cells[5].innerHTML = result.value.contraseña;
        seleccionado.cells[6].innerHTML = result.value.fechaAlta;
        seleccionado.cells[7].innerHTML = result.value.fechaBaja;
        seleccionado.cells[8].innerHTML = result.value.rol;
    }
})
} else {
Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No has seleccionado ninguna fila para modificar!',
})
}
}

function eliminar() {
    if (seleccionado) {

        const nombreSeleccionado = seleccionado.cells[2].innerText;
        const apellidoSeleccionado = seleccionado.cells[3].innerText;
        const nombreCompleto = nombreSeleccionado + ' ' + apellidoSeleccionado; // Concatenación de nombre y apellido

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Vas a eliminar a " + nombreCompleto + "",
            icon: 'warning',
            showCancelButton: true,
            
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'boton-personalizado', // Clase para el botón de confirmar
                cancelButton: 'boton-personalizado' // Clase para el botón de cancelar
              },
        }).then((result) => {
            if (result.isConfirmed) {
                seleccionado.remove();
                seleccionado = null;
                Swal.fire(
                    'Eliminado!',
                    ""+ nombreCompleto + '  ha sido eliminado/a.',
                    'success'
                )
            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No has seleccionado ninguna fila para eliminar!',
        })
    }
}

function seleccionarFila(btn) {
    let fila = btn.parentNode.parentNode;
    // Si la fila ya está seleccionada, deseleccionarla
    if (fila === seleccionado) {
        seleccionado.classList.remove('selected');
        seleccionado = null;
    } else {
        // Eliminar la clase 'selected' de todas las filas
        let filas = document.getElementsByTagName('tr');
        for (let i = 0; i < filas.length; i++) {
            filas[i].classList.remove('selected');
        }
        // Agregar la clase 'selected' a la nueva fila seleccionada
        fila.classList.add('selected');
        seleccionado = fila;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const buscador = document.getElementById('buscador');
    buscador.addEventListener('keyup', function() {
        const texto = buscador.value.toLowerCase();
        const filas = document.getElementById('tabla').getElementsByTagName('tr');

        Array.from(filas).forEach(function(fila) {
            const celdas = fila.getElementsByTagName('td');
            let coincide = false;
            Array.from(celdas).forEach(function(celda) {
                if (celda.textContent.toLowerCase().indexOf(texto) > -1) {
                    coincide = true;
                }
            });
            if (fila.style.display === 'none') fila.style.display = ''; 
            if (coincide) {
                fila.style.display = '';
            } else if (fila.rowIndex !== 0) { 
                fila.style.display = 'none';
            }
        });
    });
});

let filasPorPagina = 5;
let paginaActual = 1;

function mostrarTabla(pagina) {
    const filas = document.getElementById('tabla').getElementsByTagName('tr');
    // Asumiendo que la primera fila es el encabezado y no debe contarse como parte de la paginación
    const inicio = (pagina - 1) * filasPorPagina + 1; // +1 para saltar la fila de encabezado
    const fin = inicio + filasPorPagina;

    Array.from(filas).forEach((fila, index) => {
        // Asegurarse de que la fila de encabezado siempre sea visible
        if (index === 0) {
            fila.style.display = '';
        } else {
            fila.style.display = (index >= inicio && index < fin) ? '' : 'none';
        }
    });

    paginaActual = pagina;
    actualizarIndicadoresDePagina();
}

function paginaSiguiente() {
    const totalPaginas = Math.ceil(document.getElementById('tabla').getElementsByTagName('tr').length / filasPorPagina);
    if (paginaActual < totalPaginas) {
        mostrarTabla(paginaActual + 1);
    }
}

function paginaAnterior() {
    if (paginaActual > 1) {
        mostrarTabla(paginaActual - 1);
    }
}

function actualizarIndicadoresDePagina() {
    const totalFilas = document.getElementById('tabla').getElementsByTagName('tr').length - 1; // -1 para excluir el encabezado
    const totalPaginas = Math.ceil(totalFilas / filasPorPagina);
    
    // Actualiza el estado de los botones de paginación
    document.getElementById('btnAnterior').disabled = paginaActual === 1;
    document.getElementById('btnSiguiente').disabled = paginaActual === totalPaginas;
    
    // Actualiza el indicador de la página actual
    document.getElementById('indicadorPagina').textContent = `Página ${paginaActual} de ${totalPaginas}`;
}

document.addEventListener('DOMContentLoaded', function() {
    mostrarTabla(1); // Muestra la primera página al cargar
    document.getElementById('btnSiguiente').addEventListener('click', paginaSiguiente);
    document.getElementById('btnAnterior').addEventListener('click', paginaAnterior);
    actualizarIndicadoresDePagina(); 
});






