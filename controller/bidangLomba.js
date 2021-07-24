const db = require('../config/database')
var sess;

module.exports = {
  index: (req, res) => {
    sess = req.session;
    if (sess.id_user == undefined) {
      res.redirect('login')
    } else {
      db.query(
        'SELECT * FROM `user` WHERE `id_user`=(?)',
        [sess.id_user],
        (error, profil) => {
          if (error) console.log(error)
          else {
            db.query(
              'SELECT * FROM jenis_lomba',
              (error, jenisLomba) => {
                if (error) console.log(error)
                else {
                  db.query(
                    'SELECT * FROM bidang_lomba',
                    (error, tag) => {
                      if (error) console.log(error)
                      else {
                        res.render('../views/admin/index.ejs', {
                          profil,
                          jenisLomba,
                          tag,
                          page: 'bidangLomba'
                        })
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

  tambah: (req, res) => {
    if (req.body.submit == "tambah") {

      const {
        nama,
        hadiah,
        biaya,
        desk,
        link,
        namaLomba
      } = req.body

      var file = req.files.berkas
      var filename = file.name;
      file.mv("public/assets/bidangLomba/" + filename, function (err) {
        if (err) console.log(err)
        db.query(
          "INSERT INTO `bidang_lomba` (`nama_bidang`, `desk`, `biaya`, `hadiah`, `link`, `file`, `id_jenis`) VALUES (?,?,?,?,?,?,?)",
          [
            nama, desk, biaya, hadiah, link, filename, namaLomba
          ],
          (err, bidangLomba) => {
            if (err) console.log(err)
            else {

              res.redirect('/lombaAll')
            }
          }
        )
      });
    }
  }
}