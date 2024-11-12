

//URL -> servidor aws 
//const API_URL = 'http://3.83.173.143/backend/';


const API_URL = 'http://localhost/backend/';






/* -------------------------------------------------------------------------------------------------------------------------------------- */
    /* AGREGAR ESTUDIANTE */

    const botonAñadir=document.getElementById('btn-enviar');
    botonAñadir.addEventListener('click', function () {
      let nombre= document.getElementById('nombre').value;
      let apellido=document.getElementById('apellido').value;
      let dni=document.getElementById('dni').value;
      let fechaNac=document.getElementById('fechaNac').value;
      let direccion=document.getElementById('direccion').value;
      let localidad=document.getElementById('localidad').value;
      let telefono = document.getElementById('telefono').value;
      let tutor=document.getElementById('tutor').value;
      let curso=document.getElementById('curso').value;

      const alumno={
        nombre:nombre,
        apellido:apellido,
        dni:dni,
        email:email,
        fechaNac:fechaNac,
        direccion:direccion,
        localidad:localidad,
        telefono:telefono,
        tutor:tutor,
        curso:curso
      };

      fetch(API_URL+'agregarEstudiante.php',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(alumno)
      })
      .then(response=>{
        if(!response.ok){
          throw new Error('Hubo un problema al agregar el estudiante');
        }
        return response.json();
      })
      

      })
      