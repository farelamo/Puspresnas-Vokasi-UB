const db = require('../config/database')
const fs = require('fs');
var sess;

module.exports = {
  index: async (req, res) => {
    sess = req.session;
    if (sess.id_user == undefined) {
      res.redirect('login');
    } else {
      db.query(
        'SELECT * FROM `user` WHERE `id`=(?)',
        [sess.id_user],
        (error, profil) => {
          if (error) console.log(error)
          else {
            db.query(
              'SELECT * FROM jenis_lomba ORDER BY id DESC',
              (error, kategoriLomba) => {
                if (error) console.log(error)
                else {
                  db.query(
                    'SELECT * FROM bidang_lomba ORDER BY id DESC',
                    (error, bidang) => {
                      if (error) console.log(error)
                      else {
                        res.render('../views/admin/index.ejs', {
                          profil,
                          kategoriLomba,
                          bidang,
                          page: 'lombaAll'
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

  crud: async (req, res) => {                /* HAPUS JENIS */
    if (req.body.submit == "hapus") {
      db.query(
        'SELECT * FROM jenis_lomba WHERE id = ?',
        [req.body.id_lomba],
        (error, jenis) => {
          console.log(jenis[0].gambar)
          if (jenis[0].gambar !== ""){
            var filePath = "public/assets/img/jenisLomba/"+jenis[0].gambar;
            fs.unlinkSync(filePath);
            console.log("gambar berhasil dihapus");
          }
          db.query(
            "DELETE FROM `jenis_lomba` WHERE `id` = ?",
            [req.body.id_lomba],
            (err, haha) => {
              if (err) console.log(err)
              else {
                
                
               }
            }
          )
          res.redirect('/lombaAll')
        }
      )
    } else if (req.body.submit == "gambar") {     /* EDIT GAMBAR JENIS */
      if (req.files) {
        var file = req.files.gambar;
        var filename = req.body.id_lomba + ".png";
        file.mv("public/assets/img/jenisLomba/" + filename, function (err) {
          if (err) console.log(err)
          db.query(
            "UPDATE `jenis_lomba` SET `gambar` = ? WHERE `id` = ?",
            [filename, req.body.id_lomba],
            (err, result) => {
              if (err) console.log(err)
              res.redirect('/lombaAll')
            }
          )
        });
      }

    } else if (req.body.submit == 'edit') {       /* EDIT BIDANG */
      sess = req.session;
      if (sess.id_user == undefined) {
        res.redirect('login');
      } else {
        db.query(
          'SELECT * FROM `user` WHERE `id`= ?',
          [sess.id_user],
          (error, profil) => {
            if (error) console.log(error)
            else {
              db.query(
                'SELECT * FROM bidang_lomba WHERE id_jenis = ?',
                [req.body.id],
                (error, bidang) => {
                  if (error) console.log(error)
                  else {
                    db.query(
                      'SELECT * FROM  jenis_lomba',
                      (error, jenisBidang) => {
                        if (error) console.log(error)
                        else {

                          const {
                            id
                          } = req.body

                          res.render('../views/admin/index.ejs', {
                            profil,
                            bidang,
                            jenisBidang,
                            id,
                            page: 'editBidang'
                          })
                        }
                      }
                    )
                  }
                })
            }
          })
      }
    } else {
      console.log("nothing happen -" + req.body.submit + "-")
      res.redirect('/lombaAll')
    }
  }
}