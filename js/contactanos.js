


const API_URL = 'http://3.83.173.143/backend/';



/* const API_URL = 'http://localhost/backend/'; */

function contactanos() {
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var organizacion = document.getElementById('organizacion').value;
    var texto = document.getElementById('mensaje').value;

    var datos = new FormData();
    datos.append('nombre', nombre);
    datos.append('email', email);
    datos.append('telefono', telefono);
    datos.append('organizacion', organizacion);
    datos.append('texto', texto);

    document.getElementById('spinner').style.display = 'block';

    fetch(API_URL + 'contactanos.php', {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.getElementById('spinner').style.display = 'none';
        if (data.success) {
            Swal.fire({
                title: 'Enviado',
                text: data.mensaje,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: data.mensaje,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    })
    .catch(error => {
        console.error('Error al procesar la solicitud:', error);
        document.getElementById('spinner').style.display = 'none';
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al procesar la solicitud. Por favor, intenta nuevamente más tarde.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });
}

document.getElementById('btnEnviar').addEventListener('click', function (e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    contactanos();
});
