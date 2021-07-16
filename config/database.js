const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'puspresnas'
})

db.connect((error) => {
    if (error) {
        console.log('Koneksi database terputus !!')
    } else {
        console.log('Koneksi database tersambung..')
    }
})

module.exports = db