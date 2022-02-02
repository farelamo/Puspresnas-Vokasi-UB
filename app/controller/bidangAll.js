const db = require('../config/database')
const fs = require('fs');
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
              'SELECT * FROM bidang_lomba WHERE jenis_lomba_id= ? ORDER BY `id` DESC',
              [req.params.id],
              (error, bidang) => {
                if (error) console.log(error)
                else {
                  res.render('../views/admin/index.ejs', {
                    profil,
                    bidang,
                    id_jenis: req.params.id,
                    page: 'bidangAll'
                  })
                }
              }
            )
          }
        }
      )
    }
  },

  delete: (req, res) => {
    if (req.body.submit == "hapus") {
      db.query(
        'SELECT * FROM bidang_lomba WHERE id = ?',
        [req.body.id_bidang],
        (error, result) => {
          if (error) console.log(error)
          else {
            if (result[0].gambar !== ""){
              var filePath = "public/assets/img/bidangLomba/"+result[0].gambar;
              fs.unlinkSync(filePath);
              console.log("gambar berhasil dihapus");
            }

            if (result[0].file !== ""){
              var filePath = "public/assets/bidangLomba/"+result[0].file;
              fs.unlinkSync(filePath);
              console.log("file berhasil dihapus");
            }

            db.query(
              'DELETE FROM bidang_lomba WHERE id = ?',
              [req.body.id_bidang],
              (error, hapus) => {
                if (error) console.log(error)
                else {
                  res.redirect('/bidangAll/' + req.params.id)
                }
              }
            )
          }
        }
      )

    }
  }
}