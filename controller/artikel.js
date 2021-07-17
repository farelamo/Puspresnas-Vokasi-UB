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
              'SELECT * FROM artikel ORDER BY `id_artikel` DESC',
              (error, artikel) => {
                if (error) console.log(error)
                else {
                  res.render('../views/admin/index.ejs', {
                    profil,
                    artikel,
                    page: 'artikel'
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
    if (req.body.submit=="hapus") {
      db.query(
        "DELETE FROM `artikel` WHERE `id_artikel` = ?",
        [req.body.id_artikel],
        (err, result) => {
          if (err) console.log(err)
          res.redirect('/artikel')
        }
      )
    }else if (req.body.submit=="foto") {
      if (req.files) {
        var file = req.files.foto;
        var filename = req.body.id_artikel+".png";
        file.mv("public/assets/img/artikel/"+filename,function(err){
          if(err)console.log(err)
          db.query(
            "UPDATE `artikel` SET `foto`=? WHERE `id_artikel` = ?",
            [filename, req.body.id_artikel],
            (err, result) => {
              if (err) console.log(err)
              res.redirect('/artikel')
            }
          )
        });
      }
    } else {
      console.log("nothing happen -"+req.body.submit+"-")
      res.redirect('/artikel')
    }

  }

}