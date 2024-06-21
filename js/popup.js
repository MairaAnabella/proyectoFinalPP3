function togglePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = (popup.style.display === "block") ? "none" : "block";
  }


  let seleccionado = null;
    
function agregar() {
Swal.fire({
  title: 'Agregar nuevo elemento',
  html: `<input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
         <input type="text" id="apellido" class="swal2-input" placeholder="Apellido">`,
  confirmButtonText: 'Agregar',
  focusConfirm: false,
  preConfirm: () => {
      const nombre = Swal.getPopup().querySelector('#nombre').value
      const apellido = Swal.getPopup().querySelector('#apellido').value
      if (!nombre || !apellido) {
          Swal.showValidationMessage(`Por favor ingresa ambos campos: Nombre y Apellido`)
      }
      return { nombre: nombre, apellido: apellido }
  }
}).then((result) => {
  if (result.isConfirmed) {
      let tabla = document.getElementById('data-table');
      let fila = tabla.insertRow();
      let celda1 = fila.insertCell();
      let celda2 = fila.insertCell();
      let celda3 = fila.insertCell();

      celda1.innerHTML = '<button onclick="seleccionarFila(this)">Seleccionar</button>';
      celda2.innerHTML = result.value.nombre;
      celda3.innerHTML = result.value.apellido;
  }
})
}

function modificar() {
if (seleccionado) {
  Swal.fire({
      title: 'Modificar elemento',
      html: `<input type="text" id="nombre" class="swal2-input" placeholder="Nombre" value="${seleccionado.cells[1].innerHTML}">
             <input type="text" id="apellido" class="swal2-input" placeholder="Apellido" value="${seleccionado.cells[2].innerHTML}">`,
      confirmButtonText: 'Modificar',
      focusConfirm: false,
      preConfirm: () => {
          const nombre = Swal.getPopup().querySelector('#nombre').value
          const apellido = Swal.getPopup().querySelector('#apellido').value
          if (!nombre || !apellido) {
              Swal.showValidationMessage(`Por favor ingresa ambos campos: Nombre y Apellido`)
          }
          return { nombre: nombre, apellido: apellido }
      }
  }).then((result) => {
      if (result.isConfirmed) {
          seleccionado.cells[1].innerHTML = result.value.nombre;
          seleccionado.cells[2].innerHTML = result.value.apellido;
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
          seleccionado.remove();
          seleccionado = null;
      }
      else {
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



