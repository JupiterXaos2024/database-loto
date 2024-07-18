const express = require('express')
const route = express.Router()
const respuestas = require('../../red/respuestas')
const controlador = require('./controlador')

route.put('/',verific)

async function verific(req,res,next){
    try {
        const cc = req.body
        console.log(cc)
        const veri = await controlador.verificar(cc)
        if(veri[0].CC === cc){
            respuestas.success(req,res,'la cc existe en la DB',201)
        }        
    }catch (err) {
        respuestas.success(req,res,'la cc no existe',202)
    }
}
module.exports = route