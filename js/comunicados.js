
// Verificar si el usuario está autenticado al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    
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



// Selecciona el formulario
const form = document.querySelector('form');

// Agrega un evento de envío de formulario
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita que el formulario se envíe de manera predeterminada

  // Llama a la función Sweet Alert
  Swal.fire({
    title: 'Correo electrónico enviado!',
    text: 'El correo electrónico ha sido enviado con éxito.',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });

  // Envía el formulario de manera manual
  // (Aquí debes agregar el código para enviar el formulario)
});