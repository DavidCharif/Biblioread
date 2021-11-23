function checkTelefono(){
    /*y = x.value;*/
    
    let x = document.getElementById("telefono");
    let y = document.getElementById("telefono").value;
    if (y.length == null){
        return false
    }
    if (y.length < 7 || y.length < 13){
        x.style.background = "red";
        return false;}
    else {
        x.style.background = "lightgreen";
        return true; }
    }

function checkCorreo(){
   let val= document.getElementById("correo") ;
   let valor= document.getElementById("correo").value;
   let validar="falso";
   let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
   if(emailRegex.test(valor)){
       validar="verdadero";
   }
   if (validar=="falso"){
       val.style.background="red";
   }
   else{
       val.style.background = "white";
   }    
   /*
   return validar;
     
   Compara las string y si es verdadero devuelve true si no false*/
   var bool_value = validar == 'verdadero';
   /*console.log(bool_value);*/
   return bool_value;
}


function checkContrasena() {
    let x = document.getElementById("password");
    let password = document.getElementById("password").value;


    let upperCaseValidation = /[A-Z]/g;
    let lowerCaseValidation = /[a-z]/g;
    let numberValidation = /[0-9]/g;
 
    if (password.length != 0) {

        if (password.match(upperCaseValidation)) {
            if (password.match(lowerCaseValidation)) {
                if (password.match(numberValidation)) {
                    if (password.length >= 8) {

                        x.style.background = "lightgreen";
                       
                        return true;

                }
            }
        }
    } else {

    x.style.background = "red";
    /*alert("La contraseña debe contener mínimo:\nUna (1) mayúscula,\nUna (1) minúscula,\nUn (1) número,\nOcho (8) ó más caracteres.");*/
    return false;
    }

    }
}

//Funcion para validar Apellido

function checkApellido(){
    let valor = document.getElementById("apellidos");
    let lastname = document.getElementById("apellidos").value;
    /*let lastname = valor.value;*/
    let alphabet = /^[A-Za-z]+$/;
    if (lastname != ""){
        if(lastname.match(alphabet)) {
            if(lastname.length >=4 && lastname.length<=30){
                alert("APELLIDO CORRECTO");
                valor.style.background = "lightgreen";
                return true; 
            }
            else{
                alert("DEBE SER MAYOR DE 4 Y MENOR DE 7 ");
                valor.style.background = "red";
                return false;
            }
        }
        else {
            alert("INGRESE SOLO ALFABETO");
            valor.style.background = "red";
            return false;
        }
    }
    else{
        alert("CAMPO NULO");
        valor.style.background = "red";
        return false;
    }
}
function checkNombre(){
    let valor = document.getElementById("nombre");
    let lastname = document.getElementById("nombre").value;
    /*let lastname = valor.value;*/
    let alphabet = /^[A-Za-z]+$/;
    if (lastname != ""){
        if(lastname.match(alphabet)) {
            if(lastname.length >=4 && lastname.length<=30){
            
                valor.style.background = "lightgreen";
                return true; 
            }
            else{
            
                valor.style.background = "red";
                return false;
            }
        }
        else {
            
            valor.style.background = "red";
            return false;
        }
    }
    else{
        
        valor.style.background = "red";
        return false;
    }
}
/*
module.exports= {checkApellido, checkContrasena,checkTelefono,checkCorreo, checkNombre};*/