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
              "SELECT * FROM `mahasiswa` WHERE `id`=?",
              [req.params.id],
              (error, mahasiswa) => {
                if (error) console.log(error)
                else {
                  db.query(
                    'SELECT * FROM berita',
                    (error, berita) => {
                      if (error) console.log(error)
                      else {
                        res.render('../views/admin/index.ejs', {profil, mahasiswa, berita, page: 'mahasiswaEdit'})
                      }
                    }
                  )
                }
              }
            )
          }
        }
      )
    }
  },

  crud: (req, res) => {
    if (req.body.submit=="edit") {
      var nama     = req.body.nama;
      var nim = req.body.nim;
      var jurusan       = req.body.jurusan;
      var bidang_minat       = req.body.bidang_minat;
      var nama_lomba       = req.body.nama_lomba;
      var peringkat       = req.body.peringkat;
      var pelaksana       = req.body.pelaksana;
      db.query(
        "UPDATE `mahasiswa` SET `nama`=?,`nim`=?,`jurusan`=?,`bidang_minat`=?,`nama_lomba`=?,`peringkat`=?,`pelaksana`=? WHERE `id` = ?",
        [nama, nim, jurusan,bidang_minat, nama_lomba,peringkat,pelaksana, req.body.id_berita, req.body.id_artikel],
        (err, result) => {
          if (err) console.log(err)
          res.redirect('/mahasiswa')
        }
      )
    }
  }
}