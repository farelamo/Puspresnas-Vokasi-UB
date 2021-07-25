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
              'SELECT * FROM tag_lomba ORDER BY `id` DESC',
              (error, tag) => {
                if (error) console.log(error)
                else {
                  db.query(
                    'SELECT * FROM kategori_lomba ORDER BY kategori DESC',
                    (error, kategori) => {
                      if (error) console.log(error)
                      else {
                        res.render('../views/admin/index.ejs', {
                          profil,
                          tag,
                          kategori,
                          page: 'lombaTag'
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

  kondisi: (req, res) => {
    if (req.body.submit == 'tambah') {
      db.query(
        "INSERT INTO tag_lomba (tag, id_kategori_lomba) VALUES (?,?)",
        [req.body.tag, req.body.kategoriLomba],
        (error, result) => {
          if (error) console.log(error)
          res.redirect('/lombaTag')
        }
      )
    } else if (req.body.submit == 'edit') {
      db.query(
        'UPDATE tag_lomba SET tag = ?, id_kategori_lomba = ? WHERE id = ?',
        [req.body.lomba, req.body.kategoriLomba, req.body.id],
        (error, result) => {
          // console.log(req.body.lomba)
          if (error) console.log(error)
          res.redirect('/lombaTag')
        }
      )
    } else {
      db.query(
        'DELETE FROM tag_lomba WHERE id = (?)',
        [req.body.id],
        (error, result) => {
          if (error) {
            console.log(error)
          }
          res.redirect('/lombaTag')
        }
      )
    }
  }
}