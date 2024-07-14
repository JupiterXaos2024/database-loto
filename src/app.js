const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // Importa el paquete cors
const config = require('./config.js');
const error = require('./red/errors.js');
const http = require('http');
const socketIo = require('socket.io');
const participantes = require('./moduls/data/participantes.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Cambia esto al dominio permitido
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(morgan('dev'));
app.use(cors()); // Usa cors para permitir solicitudes desde cualquier origen
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración
app.set('port', config.app.port);

// Rutas
app.use('/api/participantes', participantes);
app.use(error);

module.exports = { app, server, io };
