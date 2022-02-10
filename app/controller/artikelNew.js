var db = require('../config/database')
var sess;
var date_ob = new Date();
var date = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
var datenow = year + "-" + month + "-" + date;

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
              'SELECT * FROM kategori_konten',
              (error, kategori) => {
                if (error) console.log(error)
                else {
                  res.render('../views/admin/index.ejs', {profil, kategori, page: 'artikelNew'})
                }
              }
            )
          }
        }
      )
    }
  },

  crud: (req, res) => {
    if (req.body.submit=="tambah") {
      db.query(
        "INSERT INTO `artikel` (`judul`,`deskripsi`,`isi`,`kategori_konten_id`,`tanggal`) VALUES (?,?,?,?,?)",
        [req.body.judul, req.body.deskripsi, req.body.isi, req.body.id_kategori, datenow],
        (err, result) => {
          if (err) console.log(err)
          res.redirect('/artikel')
        }
      )
    }
  }
}