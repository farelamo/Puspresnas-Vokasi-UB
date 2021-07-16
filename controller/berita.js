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
              'SELECT * FROM berita ORDER BY `id_berita` DESC',
              (error, berita) => {
                if (error) console.log(error)
                else {
                  res.render('../views/admin/index.ejs', {
                    profil,
                    berita,
                    page: 'berita'
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
        "DELETE FROM `berita` WHERE `id_berita` = ?",
        [req.body.id_berita],
        (err, result) => {
          if (err) console.log(err)
          res.redirect('/berita')
        }
      )
    }else if (req.body.submit=="foto") {
      if (req.files) {
        var file = req.files.foto;
        var filename = req.body.id_berita+".png";
        file.mv("public/assets/img/berita/"+filename,function(err){
          if(err)console.log(err)
          db.query(
            "UPDATE `berita` SET `foto`=? WHERE `id_berita` = ?",
            [filename, req.body.id_berita],
            (err, result) => {
              if (err) console.log(err)
              res.redirect('/berita')
            }
          )
        });
      }
    } else {
      console.log("nothing happen -"+req.body.submit+"-")
      res.redirect('/berita')
    }

  }

}