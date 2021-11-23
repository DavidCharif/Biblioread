var mysql = require("mysql");
var conexion = mysql.createConnection(
    {
        host:'localhost',
        database:'basedatoslibros',
        user:'root',
        password:'940101'
    }
);

setTimeout(()=>{conexion.connect(function(error)
    {(error)?error:console.log("Conexión exitosa al sql")})},200);


/* Insertar Usuario */
function insertar_registro(nombre, apellido, telefono, correo, contrasena) {
    conexion.query("INSERT INTO Usuarios(Nombre, Apellido, Telefono, Correo, Contrasena) VALUES ('"+nombre+"' , '"+apellido+"', '"+telefono+"', '"+correo+"', '"+contrasena+"')", function(error, resultados)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                console.log("Registro exitoso de parte del query");
            }        
        }
    );
}

/* Consultar tabla*/










module.exports = {insertar_registro, conexion};

/*
conexion.end();*/