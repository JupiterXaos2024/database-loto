const mysql = require('mysql')
const config = require('../config')

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database    
}

let conexion;

function conexMysql(){
    conexion = mysql.createConnection(dbconfig)
    conexion.connect((err)=>{
        if(err){
            console.log('[db err]', err)
            //setTimeout(conexMysql,200)
        }else{
            console.log('DB CONEXION')
        }
    })
    conexion.on('error',err=>{
        console.log('[db err]',err)
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            console.log('error faltal')
            //conexMysql()
        }else{
            throw err
        }
    })
}
conexMysql()

function todos(tabla){
 return new Promise((resolve,reject)=>{
    conexion.query(`SELECT * FROM ${tabla}`,(error, result)=>{
        return error?reject(error):resolve(result)
    })
 })
}

function uno(tabla,id){
    return new Promise((resolve,reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`,(error, result)=>{
            return error?reject(error):resolve(result)
        })
     })
}
function insertar(tabla,data){
    const data1=data
    delete data1.nuevo
    return new Promise((resolve,reject)=>{
        conexion.query(`INSERT INTO ${tabla} SET ?`,data1,(error, result)=>{
            return error?reject(error):resolve(result)
        })
     })
}
function actualizar(tabla,data){
    return new Promise((resolve,reject)=>{
        conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`,[data,data.id],(error, result)=>{
            return error?reject(error):resolve(result)
        })
     })
}

function agregar(tabla,data){
    if(data && data.actualizado===1){
        return actualizar(tabla,data)
    }else{
        return insertar(tabla,data)
    }
}

function eliminar(tabla,data){
    return new Promise((resolve,reject)=>{
        conexion.query(`DELETE FROM ${tabla} WHERE id=${data.id}`,(error, result)=>{
            return error?reject(error):resolve(result)
        })
     })
}
module.exports = {
    todos,
    uno,
    agregar,
    eliminar
}