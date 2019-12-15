const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const Libro = require('./libro');
const Usuario = require('./usuario');


let Schema = mongoose.Schema;

let prestamoSchema = new Schema({
    libro: {
        type: Schema.Types.ObjectID,
        ref: 'Libro',
        required: [true, 'Favor de ingresar el nombre del libro']
    },
    usuario: {
        type: Schema.Types.ObjectID,
        ref: 'Usuario',
        required: [true, 'Favor de ingresar el usuario del prestamo']
    },
    fechaPrestamo: {
        type: String,
        required: [true,'Favor de ingresar la fecha de prestamo']
    },
    fechaEntrega:{
        type:String,
        required:[true, "Favor de ingresar la fecha de entrega del libro"]
    },
    estado:{
        type:Boolean,
        default:true


    },

});



prestamoSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Prestamo', prestamoSchema);