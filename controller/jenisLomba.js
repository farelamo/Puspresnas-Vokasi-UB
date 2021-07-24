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
              'SELECT * FROM kategori_lomba',
              (error, kategoriLomba) => {
                if (error) console.log(error)
                else {
                  db.query(
                    'SELECT * FROM tag_lomba',
                    (error, tag) => {
                      if (error) console.log(error)
                      else {
                        res.render('../views/admin/index.ejs', {
                          profil,
                          kategoriLomba,
                          tag,
                          page: 'jenisLomba'
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
        sumber,
        desk,
        tipe,
        kategoriLomba,
        tanggal,
        tag
      } = req.body

      db.query(
        "INSERT INTO `jenis_lomba` (`nama_lomba`,`sumber`,`desk`,`tipe`,`id_kategori`,`tanggal`) VALUES (?,?,?,?,?,?)",
        [
          nama, sumber, desk, tipe, kategoriLomba, tanggal
        ],
        (err, jenisLomba) => {
          if (err) console.log(err)
          else {
            console.log(tag)
            var jenis = jenisLomba.insertId;
            if(tag.length > 1) {
            tag.forEach((tag) => {
              db.query(
                'INSERT INTO `tag` (`id_jenis`,`id_tag_lomba`) VALUES (?,?)',
                [jenis, tag],
                (error, tagJenis) => {
                  if (error) console.log(error)
                  else {
                    // console.log(tagJenis, tag)
                    return console.log(tagJenis)
                  }
                }
              )
            })
          } else {
            db.query(
              'INSERT INTO `tag` (`id_jenis`,`id_tag_lomba`) VALUES (?,?)',
              [jenis, tag],
              (error, tagJenis) => {
                if (error) console.log(error)
              }
            )
          }
            res.redirect('/lombaAll')
          }
        }
      )
    }
  }
}