const express = require('express')
const route = express.Router()
const respuestas = require('../../red/respuestas')
const controlador = require('./controlador')

route.get('/',todos)
route.get('/:id',uno)
route.put('/', eliminar)
route.post('/', agregar)

async function todos(req, res, next) {
    try {
        const items = await controlador.todos()
        respuestas.success(req, res, items, 200)
    } catch (err) {
        next(err)
    }
}

async function uno(req, res, next) {
    try {
        const items = await controlador.uno(req.params.id)
        respuestas.success(req, res, items, 200)
    } catch (err) {
        next(err)
    }
}

async function eliminar(req, res, next) {
    try {
        const items = await controlador.eliminar(req.body)
        respuestas.success(req, res, 'eliminado con exito', 200)
    } catch (err) {
        next(err)
    }
}

async function agregar(req, res, next) {
    try {
        const items = await controlador.agregar(req.body)
        const mensaje = req.body.actualizado === 0 ? 'guardado con exito' : 'actualizado con exito'
        respuestas.success(req, res, mensaje, 201)
    } catch (err) {
        next(err)
    }
}

module.exports = route
