const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificatoken } = require('../middlewares/autenticar');
const Prestamo = require('../models/prestamo');
const Usuario = require('../models/usuario')
const Libro = require('../models/libro')
const app = express();


app.get('/prestamo',[verificatoken],(req, res)=>{
    let nombre;
    Prestamo.find({ estado: true })
    .exec((err, prestamos)=>{
        
       if (err) {
           return res.status(400).json({
               ok: false,
               err
           });
       }
    Libro.populate(prestamos,{path: "libro"},function(err,prestamos){

   
    Usuario.populate(prestamos,{path: "usuario"},function(err,prestamos){
        return res.status(200).json({
            ok: true,
            count: prestamos.length,
            prestamos
        });
    })
})
       
    
    });
});


app.get('/buscar/prestamo/:id',[verificatoken],(req, res)=>{
    let id=req.params.id;
    Prestamo.find({ _id: id })
    .exec((err, prestamos)=>{
       if (err) {
           return res.status(400).json({
               ok: false,
               err
           });
       } 
       Libro.populate(prestamos,{path: "libro"},function(err,prestamos){

   
        Usuario.populate(prestamos,{path: "usuario"},function(err,prestamos){
            return res.status(200).json({
                ok: true,
                count: prestamos.length,
                prestamos
            });
        })
    })
      
    })
})


app.post('/prestamo',[verificatoken],(req,res) =>{
    let body = req.body;
    let prestamo = new Prestamo({
        libro: body.libro,
        usuario: body.usuario,
        fechaPrestamo: body.fechaPrestamo,
        fechaEntrega: body.fechaEntrega,
    });
    prestamo.save((err, prestamos) =>{
        if (err) {
           return res.status(400).json({
                ok:false,
                err
            });            
        }
        return res.status(200).json({
            ok: true,
            prestamos
        });
    });
});



app.put('/prestamo/:id',[verificatoken],(req,res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ['fechaPrestamo','fechaEntrega']);

    Prestamo.findByIdAndUpdate(id, body,{new:true, runValidators:true , context:'query'},(err, PrsDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            PrsDB
        });
    });
});

app.delete('/prestamo/:id',[verificatoken],(req, res)=>{
    let id = req.params.id;
    let body = {estado:false}

    Prestamo.findByIdAndUpdate(id, body,{new:true, runValidators:true , context:'query'},(err, PrsDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            PrsDB
        });
    });
    
});

module.exports = app;