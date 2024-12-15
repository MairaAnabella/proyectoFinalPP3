
document.addEventListener("DOMContentLoaded", function () {

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
  
  });