const express = require('express')
//const ModeloSorteo = require('../models/file')
//const ModeloImagen = require('../models/model_imagen')
const ModeloProducto = require('../models/producto') ///Lo NUEVO
const router = express.Router()

const mongoose = require('mongoose')
const { json } = require('body-parser')
var ObjectId = mongoose.Types.ObjectId //Permite generar el tipo de dato ObjectId para que se inserte en la BD
const fileUpload = require('express-fileupload');//Viene de npm FileUpload
const multer = require('multer')
//const textocontrato = require("../externo/contrato") //contiene el texto del contrato
const app = express();

///////Modulo file system / Modulo file system extra; según el video dice que ya viene instalado en Node, es verdad
//en Node ya se instala cuando se instala Node pero en el front end tienes que instalarlo aparte, gran leccion!
//en realidad se usa fs-extra en lugar de fs porque permite regresar promesas
const fs = require('fs-extra'); //es para eliminar el archivo de la carpeta public/uploads luego de que 
//ha subido a cloudinary y mongoDB
/////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////LO NUEVO ////////////////////////////////////////////
const path = require('path');//nos permite trabajar con las rutas de node
//ULTIMO -> const cloudinary = require('cloudinary');

//A continuación las especificaciones de multer para la creacion de archivos y en donde se van a guardar

const storage = multer.diskStorage({
    //destination: path.join(__dirname, 'public/uploads'), //creará una carpeta local llamada public/uploads //con esta configuración la carpeta se crea dentro de la carpeta routes
    //ULTIMO -> destination: 'public/uploads', //creará una carpeta local llamada public/uploads //con esta configuración la carpeta se crea dentro de la carpeta server
    filename: (req, file, cb) => { //filename creará el nombre del archivo
        var nombrevariable = new Date().getTime() + Math.random(); 
        cb(null, nombrevariable + path.extname(file.originalname));
        
    }
    //cb es callback, cb es cualquier nombre
    //new Date().getTime()  genera la fecha actual del sistema pero en milisegundos
    //Math.random() se usa para asignar un nombre aleatorio, complementa el nombre para que no se repita
    //path.extname(file.originalname) extrae la extensión del archivo .jpg o .png o .png, etc
    //de tal manera que al el nombre del archivo cambia en cada milisegundo seguido de la extensión
})

//esto es para la subida de imagenes al servidor
//sino es router es app
//image es lo que se va a enviar desde html en este caso el nombre de la variable de postman
//router.use(multer({storage}).single('imageretro')); //sí, este es el nombre de la variable en el postman
//"interpretacion: multer revisa si cada vez que se envia un dato tiene el nombre image"
//.single = para un archivo
//.array = para varios archivos

router.use(multer({storage}).array('pelos')); //sí, este es el nombre de la variable en el postman

//const descargas = multer({storage: storage}).array('archivo');
//ULTIMO -> var descargas = multer({storage}); //NO ES USADO, BORRAR
//var descargamultiple = descargas.fields('archivo')
//"interpretacion: multer revisa si cada vez que se envia un dato tiene el nombre image"

/*ULTIMO -> 
//////////Autenticación para ingresar a cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
//////////Fin Autenticación para ingresar a cloudinary
ULTIMO -> */

////////////////////////////////////////////////////////
// rutas.js ES EL ARCHIVO DE TODAS LAS RUTAS PARA 
// GENERAR NUEVO, EDITAR, ELIMINAR COMPROBANTE
////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// R  U  T  A  S /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////R E S U M E N    D E     R U T A S/////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////----CREACIÓN------/////////////////////////////////////////////

//01 - RUTA PARA CREAR UNA NUEVA IMAGEN Y NUEVOS CAMPOS DEL PRODUCTO
//api/catalogo/images/add
//app.post('/upload',upload.array('files'),(req,res)=>{
//router.post('/producto/agregar', async(req, res) => { //ruta para que la ejecutes cuando grabes en añadir producto //funcionaba antes
//router.post('/producto/agregar', async(req, res) => { //ruta para que la ejecutes cuando grabes en añadir producto //funcionaba antes
//router.post('/producto/agregar', descargas.array('pelos'), (req, res) => { //ruta para que la ejecutes cuando grabes en añadir producto //funcionaba antes
router.post('/agregarproducto', async(req, res) => { //ruta para que la ejecutes cuando grabes en añadir producto //funcionaba antes 
    //const {title, description} = req.body;
    console.log("im back again - agregar");
    console.log(req.body); 
    /////Recibiendo datos de los campos del FE
    console.log(req.body.codigo_interno);
    console.log(req.body.titulo);
    console.log(req.body.descripcion);
    console.log(req.body.precio_normal);
    console.log(req.body.descuento);
    console.log(req.body.precio_final);
    console.log(req.body.condicion);
    console.log(req.body.marca);
    console.log(req.body.categoria);
    console.log(req.body.estado_producto);

    //Declaración de variables por si guardan algun producto sin ningun dato
    var codigo_interno;
    var titulo;
    var descripcion;
    var precio_normal;
    var descuento;
    var precio_final;
    var condicion;
    var marca;
    var categoria;
    var estado_producto;

    /////////////////////Validaciones para guardar los datos de los campos
    if(req.body.codigo_interno == 'undefined')
        {
            codigo_interno = '';
        }
    else
        {
            codigo_interno = req.body.codigo_interno;
        }
    
    if(req.body.titulo == 'undefined')
        {
            titulo = '';
        }
    else
        {
            titulo = req.body.titulo;
        }
    
    if(req.body.descripcion == 'undefined')
        {
            descripcion = '';
        }
    else
        {
            descripcion = req.body.descripcion;
        }
    
    if(req.body.precio_normal == 'undefined')
        {
            precio_normal = '';
        }
    else
        {
            precio_normal = req.body.precio_normal;
        }

    if(req.body.descuento == 'undefined')
        {
            descuento = '';
        }
    else
        {
            descuento = req.body.descuento;
        }

    if(req.body.precio_final == 'undefined')
        {
            precio_final = '';
        }
    else
        {
            precio_final = req.body.precio_final;
        }
    
    if(req.body.condicion == 'undefined')
        {
            condicion = '';
        }
    else
        {
            condicion = req.body.condicion;
        }
    
    if(req.body.marca == 'undefined')
        {
            marca = '';
        }
    else
        {
            marca = req.body.marca;
        }
    
    if(req.body.categoria == 'undefined')
        {
            categoria = '';
        }
    else
        {
            categoria = req.body.categoria;
        }
    
    if(req.body.estado_producto == 'undefined')
        {
            estado_producto = 'inactivo';
        }
    else
        {
            estado_producto = req.body.estado_producto;
        }

    // Todo este resultado es a nivel local, es decir está en tu computadora y luego estará en Vercel
    //console.log(req.file); //Cuando envias un solo archivo
    console.log("tamaño de req.files ->  "+req.files.length); //Cuando envias array de archivos
    console.log(req.files); //Cuando envias array de archivos

    var arrayarchivos = [];
    for (var i=0; i < req.files.length; i++)
        {
            result = await cloudinary.v2.uploader.upload(req.files[i].path, {folder: "negocio1"}) //si la carpeta negocio1 no existe Cloudinary la crea
            console.log("Subido archivo->   "+i)
            console.log("RESULT  "+i+ " "+JSON.stringify(result))
            arrayarchivos.push(
                {
                    imageURL: result.secure_url,
                    public_id: result.public_id,
                    resource_type: result.resource_type, //ejem: "image"
                    format: result.format //ejem: "jpg"
                },
            )
        }

        console.log("valor de arrayarchivos ->   "+JSON.stringify(arrayarchivos))

/*
    var arrayarchivos = [
        {
            imageURL: "http://www.google.com.pe",
            public_id: "google",
            resource_type: "image", //ejem: "image"
            format: "jpg" //ejem: "jpg"
        },
        {
            imageURL: "http://www.google.com.pe2",
            public_id: "google2",
            resource_type: "image", //ejem: "image"
            format: "jpg" //ejem: "jpg"
        }
    ]
    */

    const producto = new ModeloProducto({
        codigo_interno: codigo_interno,
        titulo: titulo,
        descripcion: descripcion,
        precio_normal: precio_normal,
        descuento: descuento,
        precio_final: precio_final,
        condicion: condicion,
        marca: marca,
        categoria: categoria,
        archivo: arrayarchivos,
        estado_producto: estado_producto
    });

    producto.save() //Aquí sucede el guardar los datos en la BD Mongo
        //Si tiene éxito al guardar se ejecuta .then
        .then(result => {
            res.send({ //con PUT no regresa ninguna respuesta, mejor usa res.end(), 
                        //cuidado res.end y res.send no pueden estar en el mismo
                        //bloque de codigo o juntos
                messageresultado: 'Exito',
                //data: result
            })
            console.log("Console --- Product create successfully - Today November 2023");
            //este resultado se ve en la terminal del server (node.js)
        })
        //Si tiene ERROR al guardar se ejecuta .catch
        .catch(err => console.log("error aqui here here->",err))
});



//0000002 - RUTA PARA AGREGAR IMAGENES DURANTE EL PROCESO DE EDICION DEL PRODUCTO
//api/catalogo/editaragregarimagenes
router.post('/eliminarproducto/:id_producto', async(req, res) => {
    const id_producto = req.params.id_producto;
    console.log(id_producto);
    await ModeloProducto.findByIdAndRemove(id_producto)
    //House.findByIdAndRemove(houseId)
        //parece que result es cualquier palabra
        .then(result => {
            res.send({
                      messageresultado: 'Exito',
                    })
            console.log("Producto borrado satisfactoriamente BACK END");
        })

        .catch(err => console.log(err))

})


//0000002 - RUTA PARA AGREGAR IMAGENES DURANTE EL PROCESO DE EDICION DEL PRODUCTO
//api/catalogo/editaragregarimagenes
router.post('/editaragregarimagenes', async(req, res) => {
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&EDITAR - AGREGAR IMAGENES&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    console.log("ok, recibiendo agregar imagenes en edicion")
    console.log(req.body._id);
    console.log("tamaño de req.files ->  "+req.files.length); //Cuando envias array de archivos
    console.log("Valor de cada req.files -> "+JSON.stringify(req.files)); //Cuando envias array de archivos
    var contador = 0;
    for (var i=0; i < req.files.length; i++)
        {
            result = await cloudinary.v2.uploader.upload(req.files[i].path, {folder: "negocio1"})
            console.log("Subido archivo->   "+i)
            console.log("RESULT  "+i+ " "+JSON.stringify(result))
            await ModeloProducto.collection.updateOne({ _id: new ObjectId(req.body._id)}, {
                    $push: {
                        "archivo": {
                            //Aqui ya no se utiliza la variable contador i 
                            //porque el result genera automaticamente el resultado
                            "imageURL": result.secure_url,
                            "public_id": result.public_id,
                            "resource_type": result.resource_type, //ejem: "image"
                            "format": result.format, //ejem: "jpg"
                            "_id": new ObjectId() //GRAN LECCION! Al colocar new ObjectId() MongoDB te genera un _id automaticamente
                            //en este caso sino quisiera que vaya el nuevo _id simplemente borra el campo: "_id": new ObjectId()
                        }
                    }
                 })
                 .then(resultado => { 
                       //res.send({ 
                       //     messageresultado: "editado-agregado-imagenes"
                       //         })
                        ////
                        console.log("El archivó cambió exitosamente en MongoDB!!! - EDITAR AGREGAR")
                        console.log("Eliminando archivos de la carpeta local - EDITAR AGREGAR")
                        fs.unlink(req.files[i].path);//elimina los archivos de la carpeta public/uploads

                        console.log("DATOS E IMAGENES ACTUALIZADAS SATISFACTORIAMENTE!!! - EDITAR AGREGAR")

                        contador = contador + 1; //CONTADOR PARA QUE LLEGADO EL MOMENTO SOLO ENVIE UN SOLO RES.SEND
                        if (contador === req.files.length) ///SOLO NECESITAMOS QUE ENVIE UN SOLO RES.SEND
                            {
                                res.send({ 
                                messageresultado: "editado-agregado-imagenes"
                                })
                            }
                        ////
                    })
                 .catch(err => console.log(err))
        }//Fin del for var i=0; i < req.files.length; i++


    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&FIN EDITAR - AGREGAR IMAGENES&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")


});


//02 - RUTA PARA EDITAR UN PRODUCTO IMAGENES Y CAMPOS DEL MISMO
//api/catalogo/editarproducto
router.post('/editarproducto', async(req, res) => {
    
    //const {title, description} = req.body;
    console.log("im back again - edition");
    //res.send("respuesta positiva")
    
    var arrayFEoriginalmodif = req.body.pathsoriginalesymodificados.split(",") //Se lee, cortar en cada coma

    console.log("*****************************************************")
    console.log("arrayFEoriginalmodif -> "+arrayFEoriginalmodif.length)
    console.log("arrayFEoriginalmodif -> "+arrayFEoriginalmodif)
    console.log("*****************************************************")

    console.log(req.body); 
    console.log(req.body._id);
    console.log(req.body.codigo_interno); 
    
    
    // Todo este resultado es a nivel local, es decir está en tu computadora y luego estará en Vercel
    //console.log(req.file); //Cuando envias un solo archivo
    console.log("tamaño de req.files ->  "+req.files.length); //Cuando envias array de archivos
    console.log("Valor de cada req.files -> "+JSON.stringify(req.files)); //Cuando envias array de archivos
    console.log("valor de req.body.cambiocampos "+req.body.cambiocampos)//significa que algo cambio ya sea en un campo o una imagen editada pero no agregada
    console.log("valor de req.body.cambioimagenes "+req.body.cambioimagenes)//significa que algo cambio ya sea en un campo o una imagen editada pero no agregada
    /*
    {
        fieldname: 'imageretro',
        originalname: '10.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: 'C:\\UNIDAD D\\REACT NATIVE\\MY PROJECTS\\catalogo_productos\\server\\routes\\public\\uploads',
        filename: '1699376253425.png',
        path: 'C:\\UNIDAD D\\REACT NATIVE\\MY PROJECTS\\catalogo_productos\\server\\routes\\public\\uploads\\1699376253425.png',
        size: 2968738
      }
      */
    
    //console.log("longitud array de paths->       "+req.files.length);
    
    //var result = '';
    //var arrayarchivos = [];
    /*no borrar
    for (var i=0; i < req.files.length; i++)
        {
            result = await cloudinary.v2.uploader.upload(req.files[i].path)
            console.log("Subido archivo->   "+i)
            console.log("RESULT  "+i+ " "+JSON.stringify(result))
            arrayarchivos.push(
                {
                    imageURL: result.secure_url,
                    public_id: result.public_id,
                    resource_type: result.resource_type, //ejem: "image"
                    format: result.format //ejem: "jpg"
                },
            )
        }
    */

    //console.log("LONGITUD arrayarchivos ->    "+arrayarchivos.length)
    //console.log("valor de arrayarchivos ->    "+JSON.stringify(arrayarchivos))

    //const result = await cloudinary.v2.uploader.upload(req.file.path); 
    //const result = await cloudinary.v2.uploader.upload(req.files.path);
    //Explicación de result: result contiene la información de la imagen subida a cloudinary;
    //lo que se le envia como parámetro es la ruta local "req.file.path"; lo más importante de result
    //es el campo "url" ó "secure_url" el cual contiene la url en donde está alojada la imagen y es lo que 
    //finalmente se guarda en MongoDB; también es importante el campo "public_id"
    //console.log("result ->    "+JSON.stringify(result))
    //result indica el resultado de la imagen subida a cloudinary


    //var bandera = "un pasito!";

    //Esto modifica solamente los campos, las IMAGENES NO!
    await ModeloProducto.collection.updateOne(
        { "_id": new ObjectId(req.body._id) }, //id del producto a modificar sus campos, MENOS IMAGENES
        //{ $inc: { "archivo.0.imageURL": "http://pechocho.com.pe" } } //esto incrementa (leer mas cuando gustes)
        //a continuacion la sintaxis para modificar
        //archivo: nombre del array principal        
        //0 o 1 o 2 -> indica la posicion del array: 0 = primera posicion, 1 = segunda, etc
        //imageURL: nombre del campo espefico dentro del array
        //{ $inc: { "archivo.0.cantidad": 2 } } 
        { $set: { 
                codigo_interno: req.body.codigo_interno,
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                precio_normal: req.body.precio_normal,
                descuento: req.body.descuento,
                precio_final: req.body.precio_final,
                condicion: req.body.condicion,
                marca: req.body.marca,
                categoria: req.body.categoria,
                //archivo: arrayarchivos,//revisar aqui??
                estado_producto: req.body.estado_producto
            }
         } 
    )
    .then(result => {
    //A partir de aqui no uso los awaits porque vayan a malograr el proceso de guardado 
    //quizas para la version 2 se puedan incluir siempre probando
    ModeloProducto.findById(req.body._id)
        .then(productos => {
            //res.send(productos)
            //console.log(productos.archivo)
            for (var a=0; a < productos.archivo.length; a++)
                {
                    console.log("Valor a aqui 001 ->    "+a)

                    for (var b=0; b < arrayFEoriginalmodif.length; b+=2)
                        {
                            if (productos.archivo[a].imageURL == arrayFEoriginalmodif[b])
                                {
                                    //console.log("entro aqui 001")
                                    console.log("Valor a aqui 002 ->    "+a)
                                    for (n=1; n < arrayFEoriginalmodif.length; n+=2)
                                        {
                                            //console.log("valor de arrayFEoriginalmodif[n]  "+arrayFEoriginalmodif[n])
                                            //console.log("tipo de arrayFEoriginalmodif[n]  "+typeof(arrayFEoriginalmodif[n]))
                                            if (arrayFEoriginalmodif[n] !== '')
                                                {                             
                                                    console.log("entro aqui 002 ----------")
                                                    //Obtenemos solo el nombre
                                                    var solonombreoriginal = arrayFEoriginalmodif[n].split('/').pop(); //obtiene el nombre del archivo .extension
                                                    //console.log("Qué es solonombreoriginal ->    "+solonombreoriginal)
                                                    //var result = '';
                                                    //var arrayarchivos = [];
                                                    var contador = 0;
                                                    for(var f=0; f < req.files.length; f++)
                                                        {
                                                                //console.log("Qué es req.files[a].originalname ->    "+req.files[f].originalname)
                                                                if (solonombreoriginal == req.files[f].originalname)
                                                                    {
                                                                        //REVISAR BIEN ESTA CONDICION!
                                                                        console.log("entro aqui 003!!!!");
                                                                        console.log("son iguales, se procede a la actualización en cloudinary y MongoDB!!!");
                                                                         
                                                                        //(async function(){ //creo que es funcion anónima
                                                                            //Codigo para subir imagen a cloudinary
                                                                            //Llamamos a la funcion subircloudinaryguardarenmongo(ruta de req.files, valor de variable "a", _id principal de registro en MongoDB)
                                                                            //subircloudinaryguardarenmongo(req.files[f].path, a, req.body._id, req.files.length, contador)
                                                                            subircloudinaryguardarenmongo(req.files[f].path, a, req.body._id)
                                                                            /*
                                                                                result = await cloudinary.v2.uploader.upload(req.files[f].path)
                                                                                arrayarchivos.push(
                                                                                    {
                                                                                        imageURL: result.secure_url,
                                                                                        public_id: result.public_id,
                                                                                        resource_type: result.resource_type, //ejem: "image"
                                                                                        format: result.format, //ejem: "jpg"
                                                                                    })

                                                                                    console.log("que vale arrayarchivos ->   "+JSON.stringify(arrayarchivos));
                                                                              */ 
                                                                               
                                                                               //await cloudinary.v2.uploader
                                                                               /*
                                                                               cloudinary.v2.uploader
                                                                               .upload(req.files[f].path)
                                                                               //console.log("result de la imagen subida a Cloudinary "+ JSON.stringify(result));
                                                                               .then(result => { 
                                                                                console.log("EL nuevo result es -> "+JSON.stringify(result))
                                                                                console.log("EJECUTANDO CODIGO DEL MONGODB ")
                                                                               })
                                                                                .catch(err => console.log("El error en Cloudinary es -> "+err))
                                                                                */
                                                                            //}());//Fin de la función asíncrona
                                                                            

                                                                               
                                                                            
                                                                            //Codigo para modificar bd mongo
                                                                            /*
                                                                            console.log("Valor a aqui 003 ->    "+a)
                                                                            console.log("Valor de productos.archivo[a]._id aqui ->    "+productos.archivo[a]._id)
                                                                                    ModeloProducto.collection.updateOne(
                                                                                            { "_id": new ObjectId('655666b0258c31477b9539d8'),//id del producto
                                                                                             "archivo._id": new ObjectId(productos.archivo[a]._id) //id de la imagen a modificar todos sus datos: imageURL, public_id, resource_type y format
                                                                                            },
                                                                                            //{ $inc: { "archivo.0.imageURL": "http://pechocho.com.pe" } } //esto incrementa (leer mas cuando gustes)
                                                                                            //a continuacion la sintaxis para modificar
                                                                                            //archivo: nombre del array principal        
                                                                                            //0 ó 1 ó 2 -> indica la posicion del array: 0 = primera posicion, 1 = segunda, etc
                                                                                            //$ indica que donde encuentre un cambio lo realizará, es decir no necesitas darle una posicion exacta
                                                                                            //imageURL: nombre del campo especifico dentro del array
                                                                                            //{ $inc: { "archivo.0.cantidad": 2 } } 
                                                                                            { $set: { 
                                                                                                "archivo.$.imageURL": result.url, //$ modificará la posicion en donde se cumplan las condiciones "_id" y "archivo._id"
                                                                                                "archivo.$.public_id": result.public_id, //$ modificará la posicion en donde se cumplan las condiciones "_id" y "archivo._id"
                                                                                                "archivo.$.resource_type": result.resource_type, //$ modificará la posicion en donde se cumplan las condiciones "_id" y "archivo._id"
                                                                                                "archivo.$.format": result.format //$ modificará la posicion en donde se cumplan las condiciones "_id" y "archivo._id"
                                                                                                }
                                                                                            } 
                                                                                        )//Fin de updateOne
                                                                                        .then(result=>{ 
                                                                                            //console.log("EL nuevo result es -> "+JSON.stringify(result))
                                                                                            console.log("Cambios realizados exitosamente!!!")
                                                                                           })
                                                                                        .catch(err => console.log("El error en MongoDB es -> "+err))
                                                                                      */  
                                                                                    
                                                                    }//fin del if
                                                                else
                                                                    {
                                                                        console.log("NO SE ACTUALIZÓ NADA! 003")
                                                                    }//fin del else
                                                        }//fin del for        
                                                }//fin del if
                                        }//fin del for
                                    //result = cloudinary.v2.uploader.upload(arraypathsmoficados[b + 1])
                                    //console.log("result "+ JSON.stringify(result))
                                    
                                    
                                    //result = cloudinary.v2.uploader.upload(arraypathsmoficados[b].uri)
                                    //console.log("result "+ JSON.stringify(result))
                                    /*
                                    
                                    //arrayidimageneseditadas.push(productos.archivo[a]._id)
                                    //Esto debería ir en un FOR

                                        var direccion = "www.google.com.pe-12:32pm pero del viernes"
                                        //Esto modifica solamente las IMAGENES
                                        ModeloProducto.collection.updateOne(
                                            { "_id": new ObjectId('655666b0258c31477b9539d8'),//id del producto
                                            "archivo._id": new ObjectId(productos.archivo[a]._id) //id de la imagen a modificar todos sus datos: imageURL, public_id, resource_type y format
                                            },
                                            //{ $inc: { "archivo.0.imageURL": "http://pechocho.com.pe" } } //esto incrementa (leer mas cuando gustes)
                                            //a continuacion la sintaxis para modificar
                                            //archivo: nombre del array principal        
                                            //0 o 1 o 2 -> indica la posicion del array: 0 = primera posicion, 1 = segunda, etc
                                            //imageURL: nombre del campo espefico dentro del array
                                            //{ $inc: { "archivo.0.cantidad": 2 } } 
                                            { $set: { 
                                                "archivo.$.imageURL": productos.archivo[a].imageURL //$ modificará la posicion en donde se cumplan las condiciones "_id" y "archivo._id"
                                                
                                                }
                                            } 
                                            
                                        );


                                        */
                                } //fin del if
                                else
                                {
                                    console.log("No sufrieron cambios -> "+productos.archivo[a].imageURL)
                                }
                        }//fin del segundo for
                }//fin del primer for

        })
        .catch(err => console.log(err))//Catch para findById para imagenes
        
                
        if(req.body.cambiocampos == "si" && req.body.cambioimagenes == "no")
            {
                console.log("solo se modificaron campos pero imagenes NO---------------------------------------------------------------------------------------------------------------------------------------------")
                res.send({ 
                    messageresultado: "Exito"
                    })
            }
        
        /*
        .catch(err => console.log(err))//Catch para findById para imagenes
        console.log("DATOS E IMAGENES ACTUALIZADAS SATISFACTORIAMENTE!!!")
        //aqui iria el send, no olvides el message
        res.send({ 
                     messageresultado: "Exito"
                    })
        */
        
    })//Fin del updateOne de los datos para MongoDB
    .catch(err => console.log(err))//Catch para guardar errores de los datos en MongoDB


    //cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "ecommerce" }, async (err, result) => {
    
//async function subircloudinaryguardarenmongo (ruta, a, id, longitudfiles, contador) {
async function subircloudinaryguardarenmongo (ruta, a, id) {
    console.log("EJECUTANDO FUNCION subircloudinary")
    await cloudinary.v2.uploader.upload(ruta, {folder: "negocio1"})
    .then(result => {
        console.log("El archivó subió exitosamente a Cloudinary!!!")
        console.log("result vale  ->   "+JSON.stringify(result));
        console.log("a vale  ->   "+a);
        //return result

        //Codigo para modificar bd mongo
        console.log("Valor a aqui 003 ->    " + a)
        console.log("------------------------------------------------------------------------------------------->    ")
        ModeloProducto.findById(id)
        .then(productos => {
            console.log("Valor de productos.archivo[a]._id aqui ->    " + productos.archivo[a]._id)
                                //Aquí insertar condicion si se modificó una imagen o se agregó una nueva
                                ModeloProducto.collection.updateOne(
                                {
                                    "_id": new ObjectId(id),//id del producto
                                    "archivo._id": new ObjectId(productos.archivo[a]._id) //id de la imagen a modificar todos sus datos: imageURL, public_id, resource_type y format
                                },
                                //{ $inc: { "archivo.0.imageURL": "http://pechocho.com.pe" } } //esto incrementa (leer mas cuando gustes)
                                //a continuacion la sintaxis para modificar
                                //archivo: nombre del array principal        
                                //0 ó 1 ó 2 -> indica la posicion del array: 0 = primera posicion, 1 = segunda, etc
                                //$ indica que donde encuentre un cambio lo realizará, es decir no necesitas darle una posicion exacta
                                //imageURL: nombre del campo especifico dentro del array
                                //{ $inc: { "archivo.0.cantidad": 2 } } 
                                {
                                    $set: {
                                        "archivo.$.imageURL": result.url, //$ modificará la posicion en donde se cumplan las condiciones "_id" y "archivo._id"
                                        "archivo.$.public_id": result.public_id, //$ modificará la posicion en donde se cumplan las condiciones "_id" y "archivo._id"
                                        "archivo.$.resource_type": result.resource_type, //$ modificará la posicion en donde se cumplan las condiciones "_id" y "archivo._id"
                                        "archivo.$.format": result.format //$ modificará la posicion en donde se cumplan las condiciones "_id" y "archivo._id"
                                    }
                                }
                            )//Fin de updateOne
                        .then(result => {
                            console.log("El archivó cambió exitosamente en MongoDB!!!")
                            console.log("Eliminando archivos de la carpeta local")
                            fs.unlink(ruta);//elimina los archivos de la carpeta public/uploads

                            console.log("DATOS E IMAGENES ACTUALIZADAS SATISFACTORIAMENTE!!!")
                            //aqui iria el send, no olvides el message
                            
                            //res.send({ 
                            //    messageresultado: "Exito"
                            //    })
                            ////
                            //contador = contador + 1; //CONTADOR PARA QUE LLEGADO EL MOMENTO SOLO ENVIE UN SOLO RES.SEND
                            //if (contador === longitudfiles) ///SOLO NECESITAMOS QUE ENVIE UN SOLO RES.SEND
                            //    {
                                    res.send({ 
                                    messageresultado: "Exito"
                                    })
                            //    }
                            ////
                        })
                        .catch(err => console.log("El error en MongoDB es -> " + err))//Catch de updateOne de las imagenes
        })
        .catch(err => console.log(err)) //Catch de findById
    })
    .catch(err => console.log(err)) //Catch de Cloudinary
}

/*
    //Esto debería ir en un FOR
    var direccion = "www.google.com.pe-12:32pm pero del viernes"
    //Esto modifica solamente las IMAGENES
    ModeloProducto.collection.updateOne(
        { "_id": new ObjectId('655666b0258c31477b9539d8'),//id del producto
          "archivo._id": new ObjectId('655666b0258c31477b9539da') //id de la imagen a modificar todos sus datos: imageURL, public_id, resource_type y format
        },
        //{ $inc: { "archivo.0.imageURL": "http://pechocho.com.pe" } } //esto incrementa (leer mas cuando gustes)
        //a continuacion la sintaxis para modificar
        //archivo: nombre del array principal        
        //0 o 1 o 2 -> indica la posicion del array: 0 = primera posicion, 1 = segunda, etc
        //imageURL: nombre del campo espefico dentro del array
        //{ $inc: { "archivo.0.cantidad": 2 } } 
        { $set: { 
            "archivo.$.imageURL": direccion //$ modificará la posicion en donde se cumplan las condiciones "_id" y "archivo._id"
            }
         } 
        
    );
*/
    
    
    /*
    //await ModeloProducto.findById(new ObjectId(req.body.id))
    await ModeloProducto.findById(new ObjectId('655666b0258c31477b9539d8'))
    .then(producto => {
        codigo_interno = req.body.codigo_interno,
        titulo =  req.body.titulo,
        descripcion = req.body.descripcion,
        precio_normal = req.body.precio_normal,
        descuento = req.body.descuento,
        precio_final = req.body.precio_final,
        condicion = req.body.condicion,
        marca = req.body.marca,
        categoria = req.body.categoria,
        archivo = arrayarchivos, //se guardan el array con los datos: imageURL, public_id, resource_type y format provenientes de Cloudinary
        estado_producto = req.body.estado_producto



        

        return producto.save(); //Aquí sucede el guardar los datos en la BD Mongo
    })
    
    //Si tiene éxito al guardar se ejecuta .then
    .then(resultado => {
        res.send({ //con PUT no regresa ninguna respuesta, mejor usa res.end(), 
                    //cuidado res.end y res.send no pueden estar en el mismo
                    //bloque de codigo o juntos
            message: 'Product create successfully - November 2023',
            //resultado: true
        })
        console.log("Product create successfully - November 2023");
        //este resultado se ve en la terminal del server (node.js)
    })
    //Si tiene ERROR al guardar se ejecuta .catch
    .catch(err => console.log("error aqui here here->",err.message))

*/

    //Lo sgte borra los archivos de la carpeta public/uploads
    /*
    for (var j=0; j < req.files.length; j++)
        {
            await fs.unlink(req.files[j].path);//elimina los archivos de la carpeta public/uploads
        }
        */
    
    
});


//03 - RUTA PARA ELIMINAR SOLO LAS IMAGENES DE UN PRODUCTO
//api/catalogo/eliminarimagenesproducto
router.post('/eliminarimagenesproducto', async(req, res) => { //ruta para que la ejecutes cuando grabes en añadir producto //funcionaba antes 
    //const {title, description} = req.body;
    console.log("im back again - deleting images");
    console.log(req.body._id);
    
    var arrayFEimagenesborradas = req.body.urlimagenesborradas.split(",") //Se lee, cortar en cada coma

    console.log("*****************************************************")
    console.log("arrayFEimagenesborradas -> "+arrayFEimagenesborradas.length)
    console.log("arrayFEimagenesborradas -> "+arrayFEimagenesborradas)
    console.log("*****************************************************")
    var contador = 0;
    for (var f=0; f < arrayFEimagenesborradas.length; f++)
        {
            await ModeloProducto.collection.updateOne(
                    {"_id" : new ObjectId(req.body._id)},
                    { $pull: { archivo: { imageURL: arrayFEimagenesborradas[f] } } }
                    //{ $pull: { archivo: { imageURL: "https://res.cloudinary.com/dog1zlm3s/image/upload/v1700888042/cebsfo6tmjbqrzifuxr6.jpg" } } }
                    //archivo es el nombre del array
                    //imageURL es uno de los campos del array; en este caso es un array anidado
                )
                .then(result => {
                    contador = contador + 1; //CONTADOR PARA QUE LLEGADO EL MOMENTO SOLO ENVIE UN SOLO RES.SEND
                    if (contador === arrayFEimagenesborradas.length) ///SOLO NECESITAMOS QUE ENVIE UN SOLO RES.SEND
                    {
                        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                        console.log("IMAGENES BORRADAS SATISFACTORIAMENTE!!!")
                        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                        res.send({
                            messageresultado: "Exito borrado imagenes"
                        })
                    }
                })
                .catch(err => console.log("El error en MongoDB es -> " + err))//Catch de updateOne de las imagenes
        }
    
});



////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////----EDICIÓN------//////////////////////////////////////////////
//14 - RUTA PARA ENCONTRAR UN BOLETO Y EDITARLO, POR EL ID
//api/sorteos/boletocomprado/:id
router.put('/boletocomprado/:id', (req, res) => {
    var fecha_compra = new Date() //Captura la fecha actual del sistema
    const boletoID = req.params.id;
    console.log("req.params.id ->    " + req.params.id)

    ModeloBoleto.findById(boletoID)
        .then(boleto => {
            //Solo necesito actualizar estos campos:
            boleto.cliente_id = req.body.cliente_id;
            boleto.fecha_compra = fecha_compra;
            boleto.estado_boleto = "1";

            return boleto.save();
        })
        .then(resultado => {
            //console.log("resultado ->   "+resultado.fecha_sorteo)
            //console.log("resultado typeof ->   "+typeof resultado.fecha_sorteo)//typeof Object
            //console.log("FECHA DE COMPRA DE BOLETO ->    "+result.fecha_compra); //arroja esta forma Thu Sep 28 2023 00:52:01 GMT-0500 (hora estándar de Perú); es una cadena
            res.send({ 
                messageresultado: resultado.fecha_compra
            })
        })
        .catch(err => console.log(err))
});




//07 - RUTA PARA CONSULTAR / LEER TODOS LOS SORTEOS
//api/sorteos/
router.get('/',(req, res) => {
    //en este caso "find()" es un método de Mongoose
    //y permite devolver todos los datos que tenemos
    //en esta collection
    ModeloProducto.find()
    //aggregate se usaría cuando quieras filtrar solo los productos disponibles / no disponibles
    /*
    const resultado = ModeloProducto.aggregate(
        [
            {
                $match: { //Filtra solo los productos disponibles
                    estado_producto: "0", //0 = Disponibles
                    estado_producto: "1", //0 = Disponibles
                }
            }
        ]
    )
    */
        //resultado puede ser cualquier nombre de variable
        .then(resultado => {
            res.send(resultado)
        })
        .catch(err => console.log(err))
        
});


//Deja esto siempre al último del archivo, si o mueves te da un error
//Este es un middleware, es decir se monta una función en el Node, en este caso
//la función la proporciona npm FileUpload, también se declara en la cabecera
router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

///////////////////////////////////////////////////////////////////////////////
module.exports = router