 const express = require('express');
const fs = require('fs');
const { verificatoken } = require('../middlewares/autenticar');
const path = require('path');
const app = express();



app.get('/imagen/:ruta/:img',(req,res) =>{
     let noImage;
    let ruta = req.params.ruta;
    let img = req.params.img;
    let rutaImagen = path.resolve(__dirname,`../../uploads/${ruta}/${img}`);
    switch (ruta){
     case 'libro':
          noImage = path.resolve(__dirname,'../../assets/noImage.png');
          break
     case 'usuario':
          noImage = path.resolve(__dirname,'../../assets/noFotoPerfil.jpg');
          break
     


    }
    
   if (fs.existsSync(rutaImagen)) {
        return res.sendFile(rutaImagen);
   }else{
    return res.sendFile(noImage);
   }


});

module.exports = app;