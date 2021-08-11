const db = require('../config/database')
var sess;

module.exports = {
  index: (req, res) => {
    sess = req.session;
    if (sess.id_user == undefined) {
      res.redirect('login')
    } else {
      db.query(
        'SELECT * FROM `user` WHERE `id`=(?)',
        [sess.id_user],
        (error, profil) => {
          if (error) console.log(error)
          else {
            db.query(
              'SELECT * FROM berita',
              (error, berita) => {
                if (error) console.log(error)
                else {
                  res.render('../views/admin/index.ejs', {profil, berita, page: 'mahasiswaNew'})
                }
              }
            )
          }
        }
      )
    }
  },

  crud: (req, res) => {
    if (req.body.submit=="submit") {
      db.query(
        "INSERT INTO `mahasiswa` (`nama`, `nim`, `jurusan`, `bidang_minat`, `nama_lomba`, `peringkat`, `pelaksana`, `id_berita`) VALUES (?,?,?,?,?,?,?,?)",
        [req.body.nama, req.body.nim, req.body.jurusan, req.body.bidang_minat,req.body.nama_lomba,req.body.peringkat,req.body.pelaksana,req.body.id_berita],
        (err, result) => {
          if (err) console.log(err)
          res.redirect('/mahasiswa')
        }
      )
    }
  }
}