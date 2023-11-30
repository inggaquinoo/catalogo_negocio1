const mongoose = require('mongoose');

const EschemaProducto = new mongoose.Schema({
    codigo_interno:  { type: String, require: false },
    titulo:  { type: String, require: false },
    descripcion:  { type: String, require: false },
    precio_normal:  { type: Number, require: false },
    descuento:  { type: Number, require: false },
    precio_final: { type: Number, require: false },
    condicion: { type: String, require: false },
    marca: { type: String, require: false },
    categoria: { type: String, require: false },
    archivo:[
        {
         imageURL: String, //sirve para al almacenar el URL de la imagen, esta url apunta a la imagen en Cloudinary
         public_id: String, //sirve para almacenar el ID que Cloudinary le da a cada foto (archivo) almacenado
         resource_type: String, //almacena por ejem: "image"
         format: String, //almacena por ejem: "jpg"
         cantidad: String
        }
    ],
    estado_producto: { type: String, require: true }, // activo | inactivo
},{versionKey:false})

module.exports = mongoose.model('productos',EschemaProducto)