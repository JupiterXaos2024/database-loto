let mysql = require('mysql')
let conexion = mysql.createConnection({
    host:'193.84.177.252',
    database:'t304329_Loto',
    user:'t304329_Jupiter',
    password:'9]#nv4*dl#;X~ek35N'
})

conexion.connect(function(err){
    if(err){
        throw err
    }else{
        console.log("conexion exitosa")
    }
})