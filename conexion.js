//const fs = require('fs');
//const path = require('path');

//const logo = fs.readFileSync(path.resolve(__dirname, './assets/img/logo.svg'));

//const dirname = 'file://storage/emulated/0/Documents/Loteria/';

//console.log ("que es: ->>   "+'/storage/emulated/0/Download'.split(path.sep))

//const binaryData = fs.readFileSync(path.resolve('C:/UNIDAD D/', 'abc.pdf')); //funciona ok

//const binaryData = fs.readFileSync('/Download/abc.pdf');
//const binaryData = fs.readFileSync('/storage/emulated/0/Download/abc.pdf');
//const binaryData = fs.readFileSync('file:///storage/emulated/0/Download/abc.pdf');


//const binaryData = fs.readFileSync(path.resolve('/UNIDAD D', 'abc.pdf'));
//const binaryData = fs.readFileSync(path.resolve('//storage/emulated/0/Android/data/com.thelotery/files', 'abc.pdf'));


//Este equipo\Galaxy A10\Phone\Android\data\com.thelotery\files
///Android/data/packageName/files
//file:///storage/emulated/0/Android/data/packageName/files/


//const filename = "package.json";
//const filename = "abc.pdf";
//const filename = "https://cs.uns.edu.ar/materias/iocp/downloads/Apuntes/Unidad%203%20-%20Internet.pdf";

//const binaryData = fs.readFileSync('https://cs.uns.edu.ar/materias/iocp/downloads/Apuntes/Unidad%203%20-%20Internet.pdf');

/*
const base64String = new Buffer(binaryData).toString("base64");
console.log("A N T E S");
console.log(base64String);
console.log("Current directory:", __filename);
console.log("Current directory:", __dirname);
*/
//////////////

//variable de entorno, es usada porque no siempre vamos
//a poder correr el programa en un puerto especifico 
require('dotenv').config();

const mongoose = require('mongoose');
                //mongodb es el proveedor de la base de datos
                //127.0.0.1 es el IP por donde escucha la tarjeta de red
                //puerto: 127017
                //Nombre de la base de datos: crudmernstack
//mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dp6bpsr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
//mongoose.connect(`mongodb+srv://gustavo:1234567890@cluster0.dp6bpsr.mongodb.net/lotery?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
//mongoose.connect(process.env.MONGO_CONNECT_URI)
//console.log ("cadena ->     "+process.env.MONGO_CONNECT_URI)
//mongoose.connect(process.env.MONGO_CONNECT_URI,{useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connect(process.env.MONGO_CONNECT_URI)
//mongoose.connect(process.env.MONGO_CONNECT_URI)
//mongoose.connect(uri, { useNewUrlParser: true });

//Esto se crea para crear los msjes de conexión
const objetobd = mongoose.connection                                                                                                                
                        //funcion callback ()=>
    objetobd.on('connected',()=>{console.log('Conexion correcta a MongoDB')})
    objetobd.on('error',()=>{console.log('Error en la conexion a MongoDB')})






module.exports = mongoose