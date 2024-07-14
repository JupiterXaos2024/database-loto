const { app, server } = require('./app')

server.listen(app.get('port'), () => {
    console.log('escuchando en el puerto: ', app.get('port'))
})
