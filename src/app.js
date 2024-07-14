const express = require('express')
const morgan = require('morgan')
const config = require('./config.js')
const participantes = require('./moduls/data/participantes.js')
const error = require('./red/errors.js')
const http = require('http');
const socketIo = require('socket.io');

const app = express()
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Cambia esto al dominio permitido
        methods: ["GET", "POST"]
    }
});
//middleware
app.use(morgan('dev')) 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//configuracion

app.set('port', config.app.port)

//rutas
app.use('/api/participantes', participantes)
app.use(error)

module.exports = app