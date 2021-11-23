let registros = [];   // Nombre según nuevo instructivo

// Se cambian algunos id a los nuevos según comentario en clase
function agregarRegistro() {
     
    let usuario = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        contrasena: document.getElementById("contrasena").value
    }
    registros.push(usuario);
    // document.forms[0].reset(); lo dejamos comentado para que no moleste
}

// FUNCION FILTRA CORREOS GMAIL.COM
function filtrarCorreo(array){
    //se agrega variable
    let gmail = array.filter(UsuarioGmail => UsuarioGmail.correo.includes('@gmail.com'));
    console.log(gmail);
    return gmail;
}

//FUNCION ORDENAR CORREOS 
function ordenarArreglo(arreglo){
    arreglo.sort((a,b)=>{
        if(a.apellido.toLowerCase()==b.apellido.toLowerCase()){
            return 0;
        }
        else if(a.apellido.toLowerCase()>b.apellido.toLowerCase()){
            return 1;
        }
        else{
            return -1;
        }
        console.log(arreglo);
    })
    return arreglo

}

module.exports.registros = registros; // Este no me cuadra
module.exports.filtrarCorreo = filtrarCorreo;
module.exports.ordenarArreglo = ordenarArreglo;
module.exports.agregarRegistro = agregarRegistro;
