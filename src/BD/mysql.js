const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database    
};

const pool = mysql.createPool(dbconfig);

function query(sql, values) {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
}

function todos(tabla) {
    return query(`SELECT * FROM ${tabla}`);
}

function uno(tabla, id) {
    return query(`SELECT * FROM ${tabla} WHERE id=?`, [id]);
}

function insertar(tabla, data) {
    const data1 = { ...data };
    delete data1.nuevo;
    return query(`INSERT INTO ${tabla} SET ?`, data1);
}

function actualizar(tabla, data) {
    return query(`UPDATE ${tabla} SET ? WHERE id = ?`, [data, data.id]);
}

function agregar(tabla, data) {
    if (data && data.actualizado === 1) {
        return actualizar(tabla, data);
    } else {
        return insertar(tabla, data);
    }
}

function eliminar(tabla, data) {
    return query(`DELETE FROM ${tabla} WHERE id = ?`, [data.id]);
}

function login(tabla, cc, password) {
    return query(`SELECT password FROM ${tabla} WHERE CC = ?`, [cc]);
}

function Verificar(tabla, cc) {
    return query(`SELECT * FROM ${tabla} WHERE CC = ?`, [cc]);
}

pool.getConnection((err, connection) => {
    if (err) {
        console.error('[db err]', err);
    } else {
        console.log('DB CONEXION');
        connection.release();
    }
});

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    login,
    Verificar
};
