const db = require('../../BD/mysql')

const tabla = 'participantes'

function todos(){
    return db.todos(tabla)
}
function uno(id){
    return db.uno(tabla,id)
}
function eliminar(body){
    return db.eliminar(tabla,body)
}
function agregar(body){
    return db.agregar(tabla,body)
}
module.exports = {
    todos,
    uno,
    eliminar,
    agregar
}