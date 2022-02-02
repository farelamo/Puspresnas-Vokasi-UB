const db = require('../config/database')
const CryptoJS = require("crypto-js");
const fs = require('fs');
var sess;

module.exports = {
  index: (req, res) => {
    sess = req.session;
    if (sess.id_user == undefined) {
      res.redirect('login');
    } else {
      db.query(
        'SELECT * FROM `user` WHERE `id`=(?)',
        [sess.id_user],
        (error, profil) => {
          db.query(
            'SELECT * FROM `user`',
            [sess.id_user],
            (error, user) => {
              res.render('../views/admin/index.ejs', {
                profil,
                user,
                page: 'user'
              });
            }
          );
        }
      );
    }
  },

  crud: (req, res) => {
    if (req.body.submit == "tambah") {
      db.query(
        "SELECT * FROM `user` WHERE `username` = ?",
        [req.body.username],
        (err, user2) => {
          if (err) console.log(err)
          console.log("username baru = "+req.body.username);
          console.log("duplikat username baru = "+user2.length);
          if (user2.length==0) {
            var password = CryptoJS.MD5(req.body.password).toString();
            db.query(
              "INSERT INTO `user` (`username`,`nama`,`password`,`level`) VALUES (?,?,?,?)",
              [req.body.username, req.body.nama, password, req.body.level],
              (err, result) => {
                if (err) console.log(err)
                var berhasil = "User berhasil ditambahkan"
                console.log(berhasil);
                db.query(
                  'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error, profil) => {
                    db.query(
                      'SELECT * FROM `user`',[sess.id_user],(error, user) => {
                        res.render('../views/admin/index.ejs', {profil,user,page: 'user',berhasil});
                      }
                    );
                  }
                );
              }
            )
          }else{
            var gagal = "Username "+[req.body.username]+" telah dipakai user lain"
            console.log(gagal);
            db.query(
              'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error, profil) => {
                db.query(
                  'SELECT * FROM `user`',[sess.id_user],(error, user) => {
                    res.render('../views/admin/index.ejs', {profil,user,page: 'user',gagal});
                  }
                );
              }
            );
          }
        }
      )
    }
    else if (req.body.submit == "edit") {
      db.query(
        "SELECT * FROM `user` WHERE `id` = ?",
        [req.body.id_user],
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
                  if (req.body.password=="") {var password = user[0].password;}
                  else {var password = CryptoJS.MD5(req.body.password).toString();}
                  db.query(
                    "UPDATE `user` SET `username`=?,`nama`=?,`password`=?,`level`=? WHERE `id` = ?",
                    [req.body.username, req.body.nama, password, req.body.level, req.body.id_user],
                    (err, result) => {
                      if (err) console.log(err)
                      var berhasil = "User berhasil diedit"
                      console.log(berhasil);
                      db.query(
                        'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error, profil) => {
                          db.query(
                            'SELECT * FROM `user`',[sess.id_user],(error, user) => {
                              res.render('../views/admin/index.ejs', {profil,user,page: 'user',berhasil});
                            }
                          );
                        }
                      );
                    }
                  )
                }else{
                  var gagal = "Username "+[req.body.username]+" telah dipakai user lain"
                  console.log(gagal);
                  db.query(
                    'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error, profil) => {
                      db.query(
                        'SELECT * FROM `user`',[sess.id_user],(error, user) => {
                          res.render('../views/admin/index.ejs', {profil,user,page: 'user',gagal});
                        }
                      );
                    }
                  );
                }
              }
            )
          }
          else{
            if (req.body.password=="") {var password = user[0].password;}
            else {var password = CryptoJS.MD5(req.body.password).toString();}
            db.query(
              "UPDATE `user` SET `username`=?,`nama`=?,`password`=?,`level`=? WHERE `id` = ?",
              [req.body.username, req.body.nama, password, req.body.level, req.body.id_user],
              (err, result) => {
                if (err) console.log(err)
                var berhasil = "User berhasil diedit"
                console.log(berhasil);
                db.query(
                  'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error, profil) => {
                    db.query(
                      'SELECT * FROM `user`',[sess.id_user],(error, user) => {
                        res.render('../views/admin/index.ejs', {profil,user,page: 'user',berhasil});
                      }
                    );
                  }
                );
              }
            )
          }
        }
      )
    }
    else if (req.body.submit == "foto") {
      if (req.files) {
        var file = req.files.foto;
        var filename = req.body.id_user+".png";
        file.mv("public/assets/img/profil/"+filename,function(err){
          if(err)console.log(err)
          db.query(
            "UPDATE `user` SET `foto`=? WHERE `id` = ?",
            [filename, req.body.id_user],
            (err, result) => {
              if (err) console.log(err)
              var berhasil = "Foto berhasil diedit"
              console.log(berhasil);
              db.query(
                'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error, profil) => {
                  db.query(
                    'SELECT * FROM `user`',[sess.id_user],(error, user) => {
                      res.render('../views/admin/index.ejs', {profil,user,page: 'user',berhasil});
                    }
                  );
                }
              );
            }
          )
        });
      }
    }
    else if (req.body.submit == "hapus") {
      db.query(
        "SELECT * FROM `user` WHERE `id` = ?",
        [req.body.id_user],
        (err, user) => {
          if (user[0].foto!==""){
            var filePath = "public/assets/img/profil/"+user[0].foto;
            fs.unlinkSync(filePath);
            console.log("foto berhasil dihapus");
          }
          db.query(
            "DELETE FROM `user` WHERE id = (?)",
            [req.body.id_user],
            (error,result) => {
              if(error) { console.log(error)}
              var berhasil = "User berhasil dihapus"
              console.log(berhasil);
              db.query(
                'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error, profil) => {
                  db.query(
                    'SELECT * FROM `user`',[sess.id_user],(error, user) => {
                      res.render('../views/admin/index.ejs', {profil,user,page: 'user',berhasil});
                    }
                  );
                }
              );
            }
          )
        }
      )
    }
    else {
      console.log("nothing happen -"+req.body.submit+"-");
      res.redirect('user')
    }
  }
}