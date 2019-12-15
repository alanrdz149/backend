const express = require('express');
const _ = require('underscore');
const { verificatoken } = require('../middlewares/autenticar');
const Libro = require('../models/libro');
const app = express();


app.get('/libro',[verificatoken],(req, res)=>{
    Libro.find({ estado: true })
    .exec((err, libro)=>{
       if (err) {
           return res.status(400).json({
               ok: false,
               err
           });
       } 
       return res.status(200).json({
           ok: true,
           count: libro.length,
           libro
       });
    })
})

app.get('/buscar/libro/:id',[verificatoken],(req, res)=>{
    let id=req.params.id;
    Libro.find({ _id: id })
    .exec((err, libro)=>{
       if (err) {
           return res.status(400).json({
               ok: false,
               err
           });
       } 
       return res.status(200).json({
           ok: true,
           count: libro.length,
           libro
       });
    })
})





app.post('/libro',[verificatoken],(req,res) =>{

    let body = req.body;

    let libro = new Libro({
        titulo: body.titulo,
        autor: body.autor,
        categoria: body.categoria,
        editorial: body.editorial,
        fecha: body.fecha,
        img: body.img,
        estado: body.estado
    });  
    libro.save((err, LbrDB) =>{
        if (err) {
           return res.status(400).json({
                ok:false,
                err
            });
            
        }
        return res.status(200).json({
            ok: true,
            LbrDB
        });
    });

});

app.delete('/libro/:id',[verificatoken],(req,res)=>{
    let id = req.params.id;
    Libro.findByIdAndUpdate(id,{ estado:false},{new:true, runValidators: true, context: 'query'},(err, resp)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});
app.put('/libro/:id',[verificatoken],(req, res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ['titulo','autor','categoria','editorial','fecha','img']);

    Libro.findByIdAndUpdate(id, body,{new:true, runValidators: true, context: 'query'},(err, LbrDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            LbrDB
        });
    });
});

module.exports = app;