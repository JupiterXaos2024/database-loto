const express = require('express')
const route = express.Router()
const respuestas = require('../../red/respuestas')
const controlador = require('./controlador')

route.put('/',login)


async function login(req, res, next){
    try {
        const cc = req.body.cc
        const password = req.body.password
        const items = await controlador.login(cc,password)
        if(items[0].password===password){
            respuestas.success(req, res, 'acceso consedido', 201)
        }else{
            respuestas.success(req, res, 'acceso bloqueado', 202)
        }
    } catch (err) {
        next(err)
    }
};

module.exports = route
