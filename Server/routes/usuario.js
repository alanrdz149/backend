const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificatoken } = require('../middlewares/autenticar');
const Usuario = require('../models/usuario');
const app = express();


app.get('/usuario',[verificatoken],(req, res)=>{
    Usuario.find({ estado: true })
    .exec((err, usuarios)=>{
       if (err) {
           return res.status(400).json({
               ok: false,
               err
           });
       } 
       return res.status(200).json({
           ok: true,
           count: usuarios.length,
           usuarios
       });
    });
});

app.get('/buscar/usuario/:id',[verificatoken],(req, res)=>{
    let id= req.params.id;
    Usuario.find({ _id:id })
    .exec((err, usuarios)=>{
       if (err) {
           return res.status(400).json({
               ok: false,
               err
           });
       } 
       return res.status(200).json({
           ok: true,
           count: usuarios.length,
           usuarios
       });
    });
});


app.get('/buscar/usuario/:id',[verificatoken],(req, res)=>{
    let id=req.params.id;
    Usuario.find({ _id: id })
    .exec((err, usuarios)=>{
       if (err) {
           return res.status(400).json({
               ok: false,
               err
           });
       } 
       return res.status(200).json({
           ok: true,
           count: usuarios.length,
           usuarios
       });
    })
})

app.post('/usuario',(req,res) =>{

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.rol,
        img: "noFotoPerfil.jpg",
        estado: body.estado
    });  
    usuario.save((err, UsrDB) =>{
        if (err) {
           return res.status(400).json({
                ok:false,
                err
            });
            
        }
        return res.status(200).json({
            ok: true,
            UsrDB
        });
    });

});

app.put('/usuario/:id',[verificatoken],(req,res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','password','role']);

    Usuario.findByIdAndUpdate(id, body,{new:true, runValidators:true , context:'query'},(err, UsrDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            UsrDB
        });
    });
});

app.delete('/usuario/:id',[verificatoken],(req, res)=>{
    let id = req.params.id;
    let body = {estado:false}

    Usuario.findByIdAndUpdate(id, body,{new:true, runValidators:true , context:'query'},(err, UsrDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            UsrDB
        });
    });
    
});



module.exports = app;
