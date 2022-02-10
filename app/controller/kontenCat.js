var db = require('../config/database')
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
              'SELECT * FROM kategori_konten',
              (error, isi) => {
                if (error) console.log(error)
                else {
                  res.render('../views/admin/index.ejs', {
                    profil,
                    isi,
                    page: 'kontenCat'
                  })
                }
              }
            )
          }
        }
      )
    }
  },

  crud: (req, res) => {
    if(req.body.submit == 'tambah') {
      db.query(
        "INSERT INTO kategori_konten (kategori) VALUES (?)",
        [req.body.kategori],
        (error, result) => {
          if (error) console.log(error)
          res.redirect('/kontenCat')
        }
      )
    } else if (req.body.submit == 'edit') {
      db.query(
        'UPDATE kategori_konten SET kategori = ? WHERE id = ?',
        [req.body.kategori, req.body.id],
        (error, result) => {
          // console.log(req.body.lomba)
          if (error) console.log(error)
          res.redirect('/kontenCat')
        }
      )
    } else {
      db.query(
        'DELETE FROM kategori_konten WHERE id = (?)',
         [req.body.id],
         (error,result) => {
           if(error) {
             console.log(error)
           }
           res.redirect('/kontenCat')
         }
      )
    }
  }
}