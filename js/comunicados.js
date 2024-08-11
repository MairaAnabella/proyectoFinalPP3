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