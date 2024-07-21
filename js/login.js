


const API_URL_LOGIN = 'http://3.83.173.143/backend/';







/* const API_URL_LOGIN = 'http://localhost/backend/';  */

function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Crear un objeto FormData y agregar los datos del formulario
    var datos = new FormData();
    datos.append('email', email);
    datos.append('password', password);

    // Realizar la solicitud fetch al backend
    fetch(API_URL_LOGIN+'login.php', {
        method: 'POST',
        body: datos
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                var nombre = data.nombre;
                var apellido = data.apellido;
                var rol = data.rol;
                var userId = data.userId;

                localStorage.setItem('nombre', nombre);
                localStorage.setItem('apellido', apellido);
                localStorage.setItem('rol', rol);
                localStorage.setItem('userId', userId);

                var url = 'userHome.html';
                window.location.href = url;

                /* Swal.fire({
                    title: '¡Éxito!',
                    text: data.mensaje,
                    width: 600,
                    padding: '3em',
                    color: '#ECB390',
                    background: '#fff ',
                    backdrop: `
                    rgba(255, 165, 0, 0.4)
                       url("/asset/correcto.gif")
                        left top
                        no-repeat 
                    `,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }); */
            } else if (data.error) {
                if (data.error.includes('bloqueada')) {
                    Swal.fire({
                        title: 'Error',
                        text: data.error,
                        width: 600,
                        padding: '3em',
                        color: '#BD574E',
                        background: '#fff',
                        backdrop: `
                    rgba(255, 165, 0, 0.4)
                    /* url("/asset/credenciales.gif")
                    left top
                    no-repeat */
                    `,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: data.error,
                        width: 600,
                        padding: '3em',
                        color: '#BD574E',
                        background: '#fff',
                        backdrop: `
                    rgba(255, 165, 0, 0.4)
                    /* url("/asset/credenciales.gif")
                    left top
                    no-repeat */
                    `,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }

        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema con la solicitud. Inténtalo de nuevo más tarde.',
                width: 600,
                padding: '3em',
                color: '#BD574E',
                background: '#fff ',
                backdrop: `
            rgba(255, 165, 0, 0.4)
               /*  url("/asset/error1.gif")
                left top
                no-repeat */
            `,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            // Aquí puedes agregar código para manejar errores
        });
}

function restablecerPass() {
    var email = document.getElementById('emailRecu').value;

    // Realizar la solicitud fetch al backend
   
        var datos = new FormData();
        datos.append('email', email);

        // Mostrar spinner de carga
    document.getElementById('spinner').style.display = 'block';
        
    
        // Realizar la solicitud fetch al backend
        fetch(API_URL_LOGIN + 'restablecerPass.php', {
            method: 'POST',
            body: datos
        })
    .then(res => res.json())
     .then(data => {
        console.log(data);
        document.getElementById('spinner').style.display = 'none';
        // Manejar la respuesta JSON
        if (data.success) {
            
            Swal.fire({
                
                text: data.mensaje,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                // Si el usuario confirma, mostrar el formulario de inicio de sesión
                if (result.isConfirmed) {
                    location.reload();
                }
            });
        } else {
            // Mostrar mensaje de error
            Swal.fire({
                
                text: data.mensaje,
                icon: 'success',
                width: 600,
                padding: '3em',
                color: '#ECB390',
                background: '#fff',
                backdrop: `
                    rgba(255, 165, 0, 0.4)
                `,
                
                confirmButtonText: 'OK'
            });
        }
    }) 
    .catch(error => {
        console.error('Error al procesar la solicitud:', error);
        document.getElementById('spinner').style.display = 'none';
        // Manejar cualquier error de red u otro tipo de error
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al procesar la solicitud. Por favor, intenta nuevamente más tarde.',
            icon: 'error',
            confirmButtonText: 'OK'
        }); 
  
});
}

// Escuchar el evento click en el botón de enviar
document.getElementById('btnentrar').addEventListener('click', function (e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    login();
});
// Escuchar el evento click en el botón de enviar
document.getElementById('btnBuscar').addEventListener('click', function (e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    restablecerPass();
});
document.getElementById('backHome').addEventListener('click', function() {
    window.location.href = 'index.html'; // Cambia esto a la URL de tu página de inicio
});


/* visibilidad de la contraseña */
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
    // Cambia el tipo de input de password a text o viceversa
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // Cambia el icono del ojo entre abierto y cerrado
    this.textContent = type === 'password' ? 'visibility_off' : 'visibility';
});

/* controla la visibilidad  */
document.getElementById('olvidasteContra').addEventListener('click', function () {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('resetForm').style.display = 'block';
});

document.getElementById('volverLogin').addEventListener('click', function () {
    document.getElementById('resetForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

/* validacion del mail */

/* const email = document.getElementById('email');
const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

email.addEventListener('input', function () {
    if (email.value.match(pattern)) {
        // Correo válido
        // document.getElementById('emailValidationMessage').textContent = 'Correo válido';
        document.getElementById('emailValidationMessage').classList.add('valid');
        document.getElementById('emailValidationMessage').classList.remove('invalid');
    } else {
        // Correo inválido
        document.getElementById('emailValidationMessage').textContent = 'Correo inválido';
        document.getElementById('emailValidationMessage').classList.add('invalid');
        document.getElementById('emailValidationMessage').classList.remove('valid');
    }
}); */











