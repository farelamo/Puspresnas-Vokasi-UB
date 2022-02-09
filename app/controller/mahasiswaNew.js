let db = require('../config/database')
let sess;

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
                  db.query(
                    'SELECT * FROM jenis_lomba',
                    (error, jenis_lomba) => {
                      if (error) console.log(error)
                      else {
                        res.render('../views/admin/index.ejs', {profil, jenis_lomba, berita, page: 'mahasiswaNew'})
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
    if (req.body.submit=="submit") {
      db.query(
        "INSERT INTO `mahasiswa` (`nama`, `nim`, `jurusan`, `bidang_minat`, `jenis_lomba_id`, `peringkat`, `beritum_id`) VALUES (?,?,?,?,?,?,?)",
        [req.body.nama, req.body.nim, req.body.jurusan, req.body.bidang_minat,req.body.jenis_lomba_id,req.body.peringkat,req.body.id_berita],
        (err, result) => {
          if (err) console.log(err)
          res.redirect('/mahasiswa')
        }
      )
    }
  }
}