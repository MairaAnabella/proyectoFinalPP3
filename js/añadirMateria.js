//URL -> servidor aws 
//const API_URL = 'http://3.83.173.143/backend/';


const API_URL = 'http://localhost/backend/';


function agregarMateria() {
    alert('hoooolaaaaaaaaa')
  let materia = document.getElementById('agregarMateria').value;
  fetch(API_URL + 'gestionMaterias.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      accion: 'agregarMateria',
      nombreMateria: materia

    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        Swal.fire({
          title: "Se agrego la materia: "+materia+"con exitó!",
          width: 600,
          padding: "3em",
          color: "#fd7e14",
          backdrop: `
        rgba(223, 124, 11, 0.616)
        left top
        no-repeat
      `

        }).then((result) => {
          if (result.isConfirmed) {  // Verifica si el usuario hizo clic en "OK"
             // Borra todos los datos del localStorage
            location.reload();       // Refresca la página
          }
        });
      }

    });


}
