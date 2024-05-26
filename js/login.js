


const API_URL_LOGIN='http://3.83.173.143/backend/login.php';







/* const API_URL_LOGIN = 'http://localhost/backend/login.php'; */

function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Crear un objeto FormData y agregar los datos del formulario
    var datos = new FormData();
    datos.append('email', email);
    datos.append('password', password);

    // Realizar la solicitud fetch al backend
    fetch(API_URL_LOGIN, {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
         if (data.success) {
            var nombre=data.nombre;
            var apellido=data.apellido;
            var rol=data.rol;
            localStorage.setItem('userId',data.userId);
            console.log(localStorage.getItem(userId));
            var url="userHome.html?nombre="+nombre+'&apellido='+apellido + '&rol='+rol;
            window.location.href=url;


            
            /*Swal.fire({
                title: '¡Éxito!',
                text: data.mensaje,
                width: 600,
                padding: '3em',
                color: '#ECB390',
                background: '#fff ',
                backdrop: `
                rgba(255, 165, 0, 0.4)
                   /*  url("/asset/correcto.gif")
                    left top
                    no-repeat 
                `,
                icon: 'success',
                confirmButtonText: 'OK'
            }); */
        } else if (data.error) {
            Swal.fire({
                title: 'Error',
                text: data.error,
                width: 600,
                padding: '3em',
                color: '#BD574E',
                background: '#fff',
                backdrop: `
                rgba(255, 165, 0, 0.4)
                  /*   url("/asset/credenciales.gif")
                    left top
                    no-repeat */
                `,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
        // Aquí puedes agregar código para manejar la respuesta del servidor
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

// Escuchar el evento click en el botón de enviar
document.getElementById('btnentrar').addEventListener('click', function(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    login();
});


/* visibilidad de la contraseña */
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function(e) {
    // Cambia el tipo de input de password a text o viceversa
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // Cambia el icono del ojo entre abierto y cerrado
    this.textContent = type === 'password' ? 'visibility_off' : 'visibility';
});






































/* CONTROLA LA ANIMACION */
document.getElementById("btnInicioSesion").addEventListener("click", iniciarSesion);
/* document.getElementById("btnRegistrarse").addEventListener("click", register); */
document.getElementById("olvidasteContra").addEventListener("click", reset);
window.addEventListener("resize", anchoPage);

/* me traigo cada elemento del HTML  */

var formularioLogin = document.querySelector(".formLogin");

var formularioReset = document.querySelector(".restablecerContra");
var contenedorLoginRegistro = document.querySelector(".contenedorLoginRegistro");
var contenedorFondo = document.querySelector(".contenedorFondo");
var contenedorLogin = document.querySelector(".contenedorLogin");
var contenedorFoto = document.querySelector(".contenedorFoto");
var resetContra = document.getElementById("olvidasteContra");




/*FUNCIONES */
/*cuando el ancho de la pagina combia se acomodan los elementos junto con el media quuery */
function anchoPage() {
    if (window.innerWidth > 850) {
        contenedorFoto.style.display = "block";
        contenedorLogin.style.display = "block";
    } else {
        contenedorFoto.style.display = "block";
        contenedorFoto.style.opacity = "1";
        contenedorLogin.style.display = "none";
        formularioLogin.style.display = "block";
        contenedorLoginRegistro.style.left = "0px";
       
    }
}

anchoPage();





function iniciarSesion() {
    if (window.innerWidth > 850) {
        formularioReset.style.display="none";
        formularioLogin.style.display = "block";
        contenedorLoginRegistro.style.left = "250px";
      
        contenedorFoto.style.opacity = "1";
        contenedorLogin.style.opacity = "0";
    } else {
        formularioReset.style.display="none";
        formularioLogin.style.display = "block";
        contenedorLoginRegistro.style.left = "0px";
       
        contenedorFoto.style.display = "block";
        contenedorLogin.style.display = "none";
    }
}



function reset() {

    if(window.innerWidth > 850){
        formularioReset.style.display="block";
        contenedorLoginRegistro.style.left="51%";
        formularioLogin.style.display="none";
        contenedorFoto.style.opacity="0";
        contenedorLogin.style.opacity="1";
    }else{

        formularioReset.style.display="block";
        contenedorLoginRegistro.style.left = "0px";
        formularioLogin.style.display = "none";
        contenedorFoto.style.display = "none";
        contenedorLogin.style.display = "block";
        contenedorLogin.style.opacity = "1";

    }

   


}

