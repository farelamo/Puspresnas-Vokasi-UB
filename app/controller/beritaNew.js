let db = require('../config/database')
let sess;
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let datenow = year + "-" + month + "-" + date;

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
                  res.render('../views/admin/index.ejs', {profil, kategori, page: 'beritaNew'})
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
        "INSERT INTO `berita` (`judul`,`deskripsi`,`isi`,`kategori_konten_id`,`tanggal`) VALUES (?,?,?,?,?)",
        [req.body.judul, req.body.deskripsi, req.body.isi, req.body.id_kategori, datenow],
        (err, result) => {
          if (err) console.log(err)
          res.redirect('/berita')
        }
      )
    }
  }
}