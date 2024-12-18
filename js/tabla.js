// Datos inicialesimport {format} from 'date-fns';
const API_URL = 'http://3.83.173.143/backend/';
//const API_URL = "http://localhost/backend-laburo/";

const datosIniciales = [];

// Verificar si el usuario está autenticado al cargar la página
document.addEventListener('DOMContentLoaded', function () {

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

  // Verificar si las variables de sesión están presentes en localStorage
  var email = localStorage.getItem('email');
  var nombre = localStorage.getItem('nombre');
  var apellido = localStorage.getItem('apellido');
  var rol = localStorage.getItem('rol');


  if (!email && !nombre && !apellido && !rol) {
    // Si falta alguna variable de sesión, redirigir al usuario al inicio de sesión
    window.location.href = 'login.html';
  } else {

    /* menu en HTML*/

    const nombreMenu = document.getElementById('nombre-user');
    nombreMenu.innerText = nombre;
    const idRol = document.getElementById('rol-user');
    switch (rol) {
      case '1':
        idRol.innerText = 'Administrador';
        break;
      case '2':
        idRol.innerText = 'Director';
        break;
      case '3':
        idRol.innerText = 'Preceptor';
        break;
      case '4':
        idRol.innerText = 'Tutor';
        break;
    }


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



function cargarDatosIniciales() {

  let tabla = document.getElementById('tabla');
  fetch(API_URL + 'obtenerDatosUsuarios.php')
    .then(res => res.json())
    .then(data => {

      data.forEach(dato => {
        

         // Inicializa fechaBajaFormat para cada fila
         let fechaBajaFormat = formatearFecha(dato.fechaBaja);

        console.log(fechaBajaFormat)
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
        celda2.textContent = dato.idUser;
        celda3.textContent = dato.nombre;
        celda4.textContent = dato.apellido;
        celda5.textContent = dato.email;
        celda6.textContent = dato.telefono;
        celda7.textContent = formatearFecha(dato.fechaAlta);
        celda8.textContent = formatearFecha(dato.fechaBaja);
        celda9.textContent = dato.descripcion;

      });
    })

}

// Precargar los datos
document.addEventListener('DOMContentLoaded', cargarDatosIniciales);

let seleccionado = null;
let contadorId = 1;

function agregar() {
  Swal.fire({
    title: 'Agregar nuevo Usuario',
    html: `
             <label for="nombre">Nombre</label>
             <input type="text" id="nombre" class="swal2-input" placeholder="Nombre">

             <label for="apellido">Apellido</label>
             <input type="text" id="apellido" class="swal2-input" placeholder="Apellido">

             <select id="sexo" class="swal2-input">
               <option value="">Seleccionar sexo</option>
               <option value="F">Femenino</option>
               <option value="M">Masculino</option>
             </select>

             <label for="email">Email</label>
             <input type="text" id="email" class="swal2-input" placeholder="Email">

              <label for="telefono">Telefono</label>
             <input type="text" id="telefono" class="swal2-input" placeholder="Telefono">

             <label for="contraseña">Contraseña</label>
             <input type="password" id="contraseña" class="swal2-input" placeholder="Contraseña">

             <select id="rol" class="swal2-input">
               <option value="">Selecciona un rol</option>
               <option value="1">Administrador</option>
               <option value="2">Directivo</option>
               <option value="3">Preceptor</option>
               <option value="4">Tutor</option>
             </select>

               <label for="calle">Calle</label>
             <input type="text" id="calle" class="swal2-input">

               <label for="numero">Numero</label>
             <input type="text" id="numero" class="swal2-input">

               <label for="localidad">Localidad</label>
             <input type="text" id="localidad" class="swal2-input">

               <label for="provincia">Provincia</label>
             <input type="text" id="provincia" class="swal2-input">
             
             
             `,
    confirmButtonText: 'Agregar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'boton-personalizado', // Clase para el botón de confirmar
      cancelButton: 'boton-personalizado' // Clase para el botón de cancelar
    },
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      const apellido = Swal.getPopup().querySelector('#apellido').value;
      const nombre = Swal.getPopup().querySelector('#nombre').value;
      const sexo = Swal.getPopup().querySelector('#sexo').value;
      const email = Swal.getPopup().querySelector('#email').value;
      const telefono = Swal.getPopup().querySelector('#telefono').value;
      const contraseña = Swal.getPopup().querySelector('#contraseña').value;
      const rol = Swal.getPopup().querySelector('#rol').value;
      const calle = Swal.getPopup().querySelector('#calle').value;
      const numero = Swal.getPopup().querySelector('#numero').value;
      const localidad = Swal.getPopup().querySelector('#localidad').value;
      const provincia = Swal.getPopup().querySelector('#provincia').value;


      // Validación de email
     /*  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
      // valida telefono y numero de domicilio
      const regexNumerico = /^[0-9]+$/; // Acepta solo números del 0 al 9 (uno o más dígitos)
      if (!regexNumerico.test(telefono) || !regexNumerico.test(numero)) {
        Swal.showValidationMessage(`El campo telefono y numero debe contener solo números`);
        return;
      }

      // Verificación de que todos los campos estén llenos
      if (!nombre || !apellido || !email || !contraseña || !rol || !telefono || !calle || !numero || !localidad || !provincia || !sexo) {
        Swal.showValidationMessage(`Por favor ingresa todos los campos`);
        return;
      } */

      //return { nombre, apellido, email, contraseña, fechaAlta, rol };

      const usuario = {
        nombre: nombre,
        apellido: apellido,
        sexo: sexo,
        email: email,
        telefono: telefono,
        contrasenia: contraseña,
        rol: rol,
        calle: calle,
        numero: numero,
        localidad: localidad,
        provincia: provincia
      }
      return fetch(API_URL + 'agregarUsuario.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al agregar el usuario.');
          }
          return response.json();
        })
        .then(data => {
          if (data.status === 'success') {
            return usuario; // Retorna los datos del usuario para agregarlo a la tabla
          } else {
            Swal.showValidationMessage(`Error: ${data.message}`);
          }
        })
        .catch(error => {
          Swal.showValidationMessage(`Error: ${error.message}`);
        });
    }




  }).then((result) => {
    if (result.isConfirmed && result.value) {

      Swal.fire(
        '¡Agregado!',
        'Tu usuario ha sido creado',
        'success'
      ).then(() => {
        // Actualizar la página
        location.reload();
      });
    }
  });
}

function modificar() {
  console.log(seleccionado)
  if (seleccionado) {
    let idActual = seleccionado.cells[1].innerHTML;
    let rolActual = seleccionado.cells[7].innerHTML;

    let opcionesRol = [
      { valor: "1", texto: "Administrador" },
      { valor: "2", texto: "Directivo" },
      { valor: "3", texto: "Preceptor" },
      { valor: "4", texto: "Tutor" }
    ];

    let opcionesHTML = opcionesRol.map(opcion =>
      `<option value="${opcion.valor}" ${opcion.texto === rolActual ? 'selected' : ''}>${opcion.texto}</option>`
    ).join('');
    Swal.fire({
      title: 'Modificar Usuario',
      html: `
            <input type="text" id="apellido" class="swal2-input" placeholder="Apellido" value="${seleccionado.cells[2].innerHTML}">
            <input type="text" id="nombre" class="swal2-input" placeholder="Nombre" value="${seleccionado.cells[3].innerHTML}">
           
           <input type="text" id="email" class="swal2-input" placeholder="Email" value="${seleccionado.cells[4].innerHTML}">
        
            <div id="fechaAlta" class="swal2-input" style="font-size: 18px; padding-top:7px; color: #333;">
            ${seleccionado.cells[6].innerHTML} <!-- Asumiendo que la fecha de alta está en la columna 6 -->
            </div>
                <label style="font-size: 16px; color: #333;">
            <input type="checkbox" id="fechaBajaCheckbox" ${seleccionado.cells[7].innerHTML ? 'checked' : ''} 
                   style="transform: scale(1.5); margin-right: 10px;">
            Tiene fecha de baja
        </label>
           <div id="rol" class="swal2-input" style="font-size: 18px; padding-top:7px;  color: #333;">
            ${seleccionado.cells[8].innerHTML} <!-- El rol también es solo lectura -->
        </div>`,/* input modificar fecha --> <input type="date" id="fechaBaja" class="swal2-input" placeholder="Fecha de Baja" value="${seleccionado.cells[7].innerHTML}"> */
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
        // const contraseña = Swal.getPopup().querySelector('#contraseña').value
        const fechaAlta = Swal.getPopup().querySelector('#fechaAlta').value
        const fechaBaja = Swal.getPopup().querySelector('#fechaBajaCheckbox').checked;
        /* const fechaBaja = Swal.getPopup().querySelector('#fechaBaja').value */
        const rol = Swal.getPopup().querySelector('#rol').value

        // Validación de email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
          Swal.showValidationMessage(`Por favor ingresa un email válido`);
          return;
        }

        // Verificación de que todos los campos estén llenos
        if (!nombre || !apellido || !email) {
          Swal.showValidationMessage(`Por favor ingresa todos los campos`);
          return;
        }

        const usuario = {
          id: idActual,
          nombre: nombre,
          apellido: apellido,
          email: email,
          fechaAlta: fechaAlta,
          fechaBaja: fechaBaja,
          rol: rol
        }
        return fetch(API_URL + 'modificarUsuario.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuario)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Hubo un problema al modificar el usuario.');
            }
            return response.json();
          })
          .then(data => {
            if (data.status === 'success') {
              return usuario; // Retorna los datos del usuario para agregarlo a la tabla
            } else {
              Swal.showValidationMessage(`Error: ${data.message}`);
            }
          })
          .catch(error => {
            Swal.showValidationMessage(`Error: ${error.message}`);
          });
      }

    }).then((result) => {
      let rol = '';
      switch (parseInt(result.value.rol)) { // Asegúrate de que el valor sea un entero
        case 1:
          rol = "Administrador";
          break;
        case 2:
          rol = "Directivo";
          break;
        case 3:
          rol = "Preceptor";
          break;
        case 4:
          rol = "Tutor";
          break;
        default:
          rol = "Desconocido"; // Manejo de caso por defecto, por si hay algún valor inesperado
      }


      if (result.isConfirmed) {
    /*     seleccionado.cells[2].innerHTML = result.value.nombre;
        seleccionado.cells[3].innerHTML = result.value.apellido;
        seleccionado.cells[4].innerHTML = result.value.email;
        //seleccionado.cells[5].innerHTML = result.value.contraseña;
        seleccionado.cells[6].innerHTML = result.value.fechaAlta;
        seleccionado.cells[7].innerHTML = result.value.fechaBaja;
        seleccionado.cells[8].innerHTML = rol;
 */
        Swal.fire(
          '¡Modificado!',
          'Tu usuario ha sido modificado',
          'success'
        ).then(() => {
          // Actualizar la página
          location.reload();
        });
      }
    });
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
    let idActual = seleccionado.cells[1].innerHTML;
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
        const usuario = {
          id: idActual
        }
        return fetch(API_URL + 'eliminarUsuario.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuario)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Hubo un problema al eliminar el usuario.');
            }
            return response.json();
          })
          .then(data => {
            if (data.status === 'success') {
              seleccionado.remove();
              seleccionado = null;
              Swal.fire(
                'Eliminado!',
                "" + nombreCompleto + '  ha sido eliminado/a.',
                'success'
              )
            } else {
              Swal.showValidationMessage(`Error: ${data.message}`);
            }
          })
          .catch(error => {
            Swal.showValidationMessage(`Error: ${error.message}`);
          });
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

document.addEventListener('DOMContentLoaded', function () {
  const buscador = document.getElementById('buscador');
  buscador.addEventListener('keyup', function () {
    const texto = buscador.value.toLowerCase();
    const filas = document.getElementById('tabla').getElementsByTagName('tr');

    Array.from(filas).forEach(function (fila) {
      const celdas = fila.getElementsByTagName('td');
      let coincide = false;
      Array.from(celdas).forEach(function (celda) {
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

document.addEventListener('DOMContentLoaded', function () {
  mostrarTabla(1); // Muestra la primera página al cargar
  document.getElementById('btnSiguiente').addEventListener('click', paginaSiguiente);
  document.getElementById('btnAnterior').addEventListener('click', paginaAnterior);
  actualizarIndicadoresDePagina();
});


/* fetch('menuLateral.html')
.then(response=>response.text())
.then(data=>{
  document.getElementById('menu').innerHTML=data;
}) */



