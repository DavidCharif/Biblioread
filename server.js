//Require
var express = require("express");
var dbFiles = require("./db.js");
var insertar_registro = dbFiles.insertar_registro
var conexion = dbFiles.conexion;
var path = require("path"); 
var session = require("express-session");
var wikipediaParser = require('./WikipediaParser');
// Var globales trabajo local
let libro;
let idLibro;
let listadoAutoresIndexados;
let d; 
let resultadoWikiBio;
let idUsuario;

//boleanos
let listFavbooks = [];
let librosRetornados = '';
let username = "";
let isLogged = "";
let hasFav = "";
let isFav = "";
// Inicio de express
const app = express();
const dirForm = path.resolve("frontend/")

// Iniciamos el servidor en la carpeta con los archivos necesarios
app.use(express.static("frontend"));
// Se inicia el servidor
app.listen("8080", function(){
    console.log("servidor iniciado ");
    
});
// Session express para el login
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// Cambio de bodyparser que se habia depreciado
app.use(express.urlencoded({extended : true}));
app.use(express.json());
// View for ejs
app.set('view engine','ejs');
app.set('views', dirForm);

//Primer request del usuario que retorna el index
app.get("/", function (petition,respuesta){
    d = username || "Extrañ@"
    // Se revisa si ya se hizo la peticion inicial
    if(librosRetornados){
     conexion.query('SELECT * FROM librosRetornados',function(req,res){
    librosRetornados = res;})};
    // ASyncronia para ejecutarla despues del primer proceso

    process.nextTick(()=>{
        isLogged == false ? console.log("no ha iniciado sesion"): console.log("Ya ha iniciado sesion")})
    process.nextTick(()=>{
        console.log("Ultimo proceso")
        // Se reinicia el boleano que comprueba si el libro esta agragado en favoritos
        isFav = false;
       respuesta.render("index", {librosRetornados, defaultUsername, isLogged, isFav});    
      
    })
       });

//Pasos necesarios para hacer la web de vista libros Retornados dinamica 


//Duncion que redirecciona segun el numero que recibe de la funcion interna del onclick ejemplo onClick("click_libro(1)")
app.get('/recibir/:number', function(petition, respuesta){
//recibimos el numero lo agregamos con el index a la lista importada
    idLibro = petition.params.number;   
    /*console.log(number);*/
    
        libro = librosRetornados[idLibro];
        if(listFavbooks){
        listFavbooks.forEach((fav) =>{
            console.log("Entro al for each de fav books")
            if (fav.idLibro == libro.idlibro){
                isFav = true;
                hasFav = true;
                console.log("es un libro favorito!")
            }
        })    
        }

    respuesta.render('vistainterna', {libro, d, isLogged, isFav,hasFav})});
// Devuelve al inicio despues de dar click en inicio en la barra de navegacion


app.get("/registrar", function (petition,respuesta){
   
    respuesta.sendFile(dirForm + "/registro.html");
});

app.post('/post', function(request, respuesta)
{
    let username = request.body.user_name;
    let apellido = request.body.user_last_name;
    let telefono = request.body.user_phone_number;
    let correo = request.body.user_email;
    let contrasena = request.body.user_password;
    
    if (correo.length > 0) {
        conexion.query('SELECT Correo FROM Usuarios WHERE Correo = ?',[correo],function(error, results, fields) {
            
            if (results.length > 0){
                
                console.log("El usuario ya existe")
                
                return false;
            } else {
                insertar_registro(username, apellido, telefono, correo, contrasena);
                console.log("Ingresando a URL agregar");
              
                
                respuesta.render('index',{username,isLogged});            
            }
        })
       
    }
    
});



app.get("/login", function (petition,respuesta){
    
    respuesta.render("login",{defaultUsername,isLogged});
});


app.post('/auth', function(request, response) {
    console.log("Se ingreso a validar el usuario y contrasena");
    
	var usernameUser = request.body.username;
	var passwordUser = request.body.password;
	
	if (username && password) {
		conexion.query('SELECT * FROM Usuarios WHERE Correo = ? AND Contrasena = ?', [usernameUser, passwordUser], function(error, results, fields) {
		    if (error){console.log(error)}
		 
			if (results.length > 0) {
				isLogged = true;
				idUsuario = results[0].IdUsuario;
				username = results[0].username;
				console.log(`idUsuario es ${idUsuario}`);
				response.render('index', {defaultUsername,isLogged,librosRetornados});
				response.end();
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			process.nextTick(()=>{
        if (idUsuario != null){   
        conexion.query("SELECT * FROM favbooks WHERE idUsuario ='"+idUsuario+"'" ,function(error, resultado) {
                if(error){
                    console.log("No tiene en favoritos");
                } else {
                listFavbooks = resultado;
                    console.log(`El id del usuario es ${idUsuario}`)
                    console.log(`id libro es favorito? ${listFavbooks}`);
                    hasFav=true;
                }})
               }})
			response.end();
		});
	}else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


    
app.get('/logout', function(req,res){
        username = ""
        isLogged = false;
        idUsuario = null;
        console.log("Loggin out")
        res.redirect('/');
    })
//Wiki



app.get("/perfil",function(req,res){
    conexion.query("SELECT * FROM favbooks WHERE idUsuario ='"+idUsuario+"'" ,function(error, resultado) {
                if(error){
                    console.log(error)
                } else {
                    if (resultado.length == 0){
                    console.log("No tiene en favoritos");
                    hasFav = false;
                    listFavbooks = 0;
                    res.render('vistaUsuario',{username,isLogged,hasFav,listFavbooks})
                    }
                listFavbooks = resultado;}})
    
    if(hasFav != false){
    
   conexion.query("UPDATE favbooks SET Titulo = (SELECT title FROM librosRetornados WHERE favbooks.idLibro = librosRetornados.idlibro)",function(error,resultado){
       if(error)
       {console.log("error actualizando lista primera etapa")}
       else {
        console.log("cargando librosRetornados 1")}})
        
        process.nextTick(() => {
            conexion.query("UPDATE favbooks SET URLIMG = (SELECT urlImgLocal FROM librosRetornados WHERE favbooks.idlibro = librosRetornados.idlibro)",function(error, resultado){
            if(error){console.log(error)}
            else {
                console.log("cargando librosRetornados 2")
                console.log(listFavbooks.length)
                hasFav = true;
                  conexion.query("SELECT * FROM favbooks WHERE idUsuario ='"+idUsuario+"'" ,function(error, resultado) {
               listFavbooks= resultado;
            })
                res.render('vistaUsuario',{username,isLogged,hasFav,listFavbooks})
            }})})
        }})                            
   
    
    

   
            
        
    


  

app.get("/listadoAutoresIndexados",function(req,res){
    setTimeout(()=>{
           conexion.query("SELECT author FROM librosRetornados ORDER BY author  Asc", function(error,resultado){
            if(error){
                console.log(error)
                
            } else {
              listadoAutoresIndexados   = resultado
               process.nextTick(() => {
        res.render('listadoAutoresIndexados',{username,isLogged,listadoAutoresIndexados});
    })
            }
        
           })},100)
    
   
 }) 
app.get("/biografia/:author",function(petition, respuesta) {
    let author = petition.params.author;
    setTimeout(()=>{
            
    wikipediaParser.fetchArticleElements(author).then(function(result)
{
   resultadoWikiBio = result;
   process.nextTick(() => {
  //do something
  respuesta.render("biografias",{username,isLogged,resultadoWikiBio});
})
}).catch(function(error)
{
  console.log(error);
}) },250)})

app.get("/addFav",function(petition, respuesta) {
    conexion.query("INSERT INTO favbooks(idUsuario,idLibro) VALUES ('"+idUsuario+"','"+idLibro+"')", function(error, resultados){
        if(error){
            throw error
        } else {
            console.log("Agregado a fav");
            
            conexion.query("SELECT * FROM favbooks WHERE idUsuario ='"+idUsuario+"'" ,function(error, resultado) {
               listFavbooks= resultado;
            })
            console.log(`id del libro despues de fav es ${idLibro}`);
            // Actualizamos la lista con informacion necesaria para el funcionamiento
 
        }
   respuesta.redirect("back");
    })
})

app.get("/delFav",function(petition, respuesta) {
     isFav = false;
     username = username;
     isLogged = isLogged;
     conexion.query("DELETE FROM favbooks WHERE idLibro = ('"+idLibro+"')", function(error, resultados){
        if(error){
            throw error
        } else {
            
            conexion.query("SELECT * FROM favbooks WHERE idUsuario ='"+idUsuario+"'" ,function(error, resultado) {
               listFavbooks= resultado;
            })
            console.log("Eliminado");
            console.log(`id del libro despues de eliminar es ${idLibro}`);
            // Actualizamos la lista con informacion necesaria para el funcionamiento
 
        }
   respuesta.render("vistainterna",{libro,username,isLogged,hasFav});
    })
})





// Accesibilidad visual -
