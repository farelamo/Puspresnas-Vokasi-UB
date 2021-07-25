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
              'SELECT * FROM kategori_lomba',
              (error, isi) => {
                if (error) console.log(error)
                else {
                  res.render('../views/admin/index.ejs', {
                    profil,
                    isi,
                    page: 'lombaCat'
                  })
                }
              }
            )
          }
        }
      )
    }
  },

  kondisi: (req, res) => {
    if(req.body.submit == 'tambah') {
      db.query(
        "INSERT INTO kategori_lomba (kategori) VALUES (?)",
        [req.body.lombas],
        (error, result) => {
          if (error) console.log(error)
          res.redirect('/lombaCat')
        }
      )
    } else if (req.body.submit == 'edit') {
      db.query(
        'UPDATE kategori_lomba SET kategori = ? WHERE id = ?',
        [req.body.lomba, req.body.id],
        (error, result) => {
          // console.log(req.body.lomba)
          if (error) console.log(error)
          res.redirect('/lombaCat')
        }
      )
    } else {
      db.query(
        'DELETE FROM kategori_lomba WHERE id = (?)',
         [req.body.id],
         (error,result) => {
           if(error) {
             console.log(error)
           }
           res.redirect('/lombaCat')
         }
      )
    }
  }
}