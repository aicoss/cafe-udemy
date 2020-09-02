const express= require('express');
const bcryptjs= require('bcryptjs');
const jwt= require('jsonwebtoken');
const Usuario= require('../models/usuario');

const app= express();

app.post('/login',(req,res)=>{
    let body= req.body;
    Usuario.findOne({email:body.email},(err,usuariodb)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!usuariodb){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        if(!bcryptjs.compareSync(body.password, usuariodb.password)){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'Contraseña incorrecta'
                }
            });
        }

        let token=jwt.sign({
            usuario: usuariodb
        },'seed-de-desarrollo',{expiresIn: process.env.CADUCIDAD_TOKEN}) //acá va cualquier nombre(secret)//60segsx60min

        res.json({
            ok:true,
            usuario: usuariodb,
            token
        });
    });
});

module.exports = app;