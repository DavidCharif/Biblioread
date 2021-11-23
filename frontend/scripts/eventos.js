/*document.querySelector("#boton").addEventListener("click",click_libro);*/


function click_libro(number){
    
    window.location.href = `recibir/${number}`;
    
  
}
function click_registro(){
    
    window.location.href = `/registrar`;
   
}
function click_login(){
    window.location.href = `/login`;
}

function agregarRegistro() {
    console.log("Se ingreso a agregar registro");
    
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("password").value;
    window.location.href = `agregar/${nombre}/${apellidos}/${telefono}/${correo}/${contrasena}`;   
    alert("EL USUARIO HA SIDO REGISTRADO EXITOSAMENTE");
    
    
    // document.forms[0].reset(); lo dejamos comentado para que no moleste
}


function click_consultar_tabla(){
    window.location.href = `recibir/`;
    window.location.href = `recibir/`;
};