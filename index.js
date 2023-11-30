///este borrar
//const ModeloBoleto = require('../server/models/boleto');
//const mongoose = require('mongoose');
//

const express = require('express');
const app = express();
//Importar conexion MongoDB
const archivoBD = require('./conexion')
//Importación del archivo de rutas y modelo usuario
const rutas = require('./routes/rutas')

//CORS: Nos permite hacer solicitudes desde un origen diferente
const cors = require('cors');

//variable de entorno, es usada porque no siempre vamos
//a poder correr el programa en un puerto especifico 
require('dotenv').config();

//const path = require('path');//nos permite trabajar con las rutas de node
//app.set('server', path.join(__dirname,'server'))

//Importar body-parser
//Esta extension "body-parser" permite obtener
//la información de los campos del formulario
const bodyParser = require('body-parser');
//const { insertMany } = require('./models/file');
app.use(bodyParser.json())//esto sirve para que nosotros envieemos en json y express lo interprete
app.use(bodyParser.urlencoded({extended: 'true'})) //sirve para cuando envias datos desde formularios node lo interprete


/////////////////La const config puede ir en un archivo aparte que se llame config.js/////////
///////////Esto se usa para que se pueda acceder a los datos usando localhost
//////////////////o IPs locales con puertos por ejem 3000
const config = {
    application: {
        cors: {
            server: [
                {
                    //origin: "192.168.101.18:5000", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }
    }
}
///////////////////////////////////////////////////////////////////////

app.use(cors());
app.use(express.json());

//Esta ruta es la base de todo, es decir cuando necesites
//una ruta lo que haces es tomar estos como base "/api/comprobantes"
//y colocarle la ruta que quieras: por ejem:
//BASE -  http://localhost:5000/api/comprobantes
//LLAMAR A TODOS LOS REGISTROS - http://localhost:5000/api/comprobantes/
//en este caso el último "/" identifica a la ruta llamar a todos los registros
app.use('/api/catalogo',rutas); //usa GET




//RECIBE EL REQ Y RES y una funcion Callback
app.get('/',(req, res)=>{
    res.end('Bienvenidos al servidor Backend Node.js Running - Catalogo')
})

//Se lee: sino tenemos el puerto en nuestro archivo .env
//el puerto se establecerá en 7000
const port = process.env.PORT || 7000;

//Configurar server básico
//Este mensaje se muestra en la consola
app.listen(port, function(){
    console.log(`El servidor NODE SÍ esta corriendo correctamente en el puerto:${port}`);
});
    //crearboletos();
    

/*

function borrarcoleecionboletos(){

    ModeloBoleto.collection.drop();

}
*/

/*

async function crearboletos() {
    try {
    
    var cantidad = 1;

    for (var i=0; i < cantidad; i++)
    {
       ModeloBoleto.collection.insertMany([
            {
                cliente_id: " ",
                empleado_id: " ",
                sorteo_id: "64dd5e361bb2aab7af059b15",
                costo: 2,
                terminos_condiciones: "TERMINOS Y CONDICIONES",
                fecha_compra: " ",
                estado_boleto: " ",
            }
        ])
    }

     await console.log(cantidad+' boletos creados satisfactoriamente');
    } catch (error) {
      console.log("Error al insertar boletos, el error es ->>  "+error);
    }
  }
*/



/*
----------ORDEN DE LOS PASOS QUE RECOORE EL NODE PARA GENERAR LA CONEXION A LA BD -------------

//-----------1 ------- SABER SI ESCUCHA EL SERVIDOR
//Configurar server básico
app.listen(5000, function(){
    console.log("El servidor NODE SÍ esta corriendo correctamente");
})

//-----------2 ------- CREAR UNA RUTA QUE CARGUE EN EL INDEX (osea pagina principal) POR ESO SE USA '/'
//RECIBE EL REQ Y RES y una funcion Callback
app.get('/',(req, res)=>{
    res.end('Bienvenidos al servidor Backend Node.js Running')
})

//--------------------3 ---------- crear el archivo conexion.js

//----------------------4 --------------importar la conexion a MongoDB
//Conexion.js devuelve mongoose.connect('mongodb://127.0.0.1:27017/crudmernstack');
*/