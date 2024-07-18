const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config.js');
const error = require('./red/errors.js');
const http = require('http');
const socketIo = require('socket.io');
const participantes = require('./moduls/data/participantes.js');
const loginRoute = require('./moduls/data/login'); // Ruta del login
const Verific = require('./moduls/data/verific.js')

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "192.168.0.41", // Cambia esto al dominio permitido
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración
app.set('port', config.app.port);

// Rutas
app.use('/api/participantes', participantes);
app.use('/api/register', participantes);
app.use('/api/login', loginRoute); // Usa la ruta del login
app.use('/api/verific', Verific);
app.use(error);

module.exports = { app, server, io };
