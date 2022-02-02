const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'puspresnas',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.connect((error) => {
    if (error) {
        console.log('Koneksi database terputus !!')
    } else {
        console.log('Koneksi database tersambung..')
    }
})

module.exports = db