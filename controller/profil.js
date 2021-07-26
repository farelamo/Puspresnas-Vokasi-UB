const db = require('../config/database')
var sess;

module.exports = {
  index: (req, res) => {
    sess=req.session; 
    if (sess.id_user==undefined) { res.redirect('login'); } 
    else {  
      db.query(
        'SELECT * FROM `user` WHERE `id`=(?)',
        [sess.id_user],
        (error,profil) => {
          res.render('../views/admin/index.ejs',{profil, page : 'profil'});
        }
      );
    }
  },

  crud: (req, res) => {
    sess=req.session;
    if (req.body.submit=="edit") {
      db.query(
        "SELECT * FROM `user` WHERE `id` = ?",
        [sess.id_user],
        (err, user) => {
          if (err) console.log(err)
          var usernameLama = user[0].username;
          console.log("username lama = "+usernameLama);
          console.log("username baru = "+req.body.username);
          if (usernameLama !== req.body.username) {
            db.query(
              "SELECT * FROM `user` WHERE `username` = ?",
              [req.body.username],
              (err, user2) => {
                if (err) console.log(err)
                console.log("duplikat username baru = "+user2.length);
                if (user2.length==0) {
                  db.query(
                    "UPDATE `user` SET `username`=?,`nama`=? WHERE `id` = ?",
                    [req.body.username, req.body.nama, sess.id_user],
                    (err, result) => {
                      if (err) console.log(err)
                      var berhasil = "Profil berhasil diedit"
                      console.log(berhasil);
                      db.query(
                        'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error,profil) => {
                          res.render('../views/admin/index.ejs',{profil, page : 'profil',berhasil});
                        }
                      );
                    }
                  )
                }else{
                  var gagal = "Edit gagal! Username telah dipakai user lain"
                  console.log(gagal);
                  db.query(
                    'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error,profil) => {
                      res.render('../views/admin/index.ejs',{profil, page : 'profil',gagal});
                    }
                  );
                }
              }
            )
          }
          else{
            db.query(
              "UPDATE `user` SET `username`=?,`nama`=? WHERE `id` = ?",
              [req.body.username, req.body.nama, sess.id_user],
              (err, result) => {
                if (err) console.log(err)
                var berhasil = "Profil berhasil diedit"
                console.log(berhasil);
                db.query(
                  'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error,profil) => {
                    res.render('../views/admin/index.ejs',{profil, page : 'profil',berhasil});
                  }
                );
              }
            )
          }
        }
      )
    }
    else if (req.body.submit=="foto") {
      if (req.files) {
        var file = req.files.foto;
        var filename = sess.id_user+".png";
        file.mv("public/assets/img/profil/"+filename,function(err){
          if(err)console.log(err)
          db.query(
            "UPDATE `user` SET `foto`=? WHERE `id` = ?",
            [filename, sess.id_user],
            (err, result) => {
              if (err) console.log(err)
              var berhasil = "Foto berhasil diedit"
              console.log(berhasil);
              db.query(
                'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error,profil) => {
                  res.render('../views/admin/index.ejs',{profil, page : 'profil',berhasil});
                }
              );
            }
          )
        });
      }
    } else {
      console.log("nothing happen -"+req.body.submit+"-")
      res.redirect('/profil')
    }

  }
}