const db = require('../config/database')
const Db = require("../models");
const fs = require('fs');
const Post = Db.artikel;
const Op = Db.Sequelize.Op;
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
              'SELECT * FROM artikel ORDER BY `id` DESC',
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
        "SELECT * FROM `artikel` WHERE `id` = ?",[req.body.id_artikel],(error, artikel) => {
          db.query(
            "DELETE FROM `artikel` WHERE `id` = ?",[req.body.id_artikel],(err, result) => {
              if (artikel[0].foto!==""){
                var filePath = "public/assets/img/artikel/"+artikel[0].foto;
                fs.unlinkSync(filePath);
                console.log("Foto berhasil dihapus");
              }
              if (err) console.log(err)
              var berhasil = "Artikel berhasil dihapus"
              console.log(berhasil);
              db.query(
                'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error, profil) => {
                  db.query(
                    'SELECT * FROM `artikel` ORDER BY `id` DESC',(error, artikel) => {
                      res.render('../views/admin/index.ejs', {profil,artikel,page: 'artikel',berhasil});
                    }
                  );
                }
              );
            }
          )
        }
      );
      
    }else if (req.body.submit=="foto") {
      if (req.files) {
        var file = req.files.foto;
        var filename = req.body.id_artikel+".png";
        file.mv("public/assets/img/artikel/"+filename,function(err){
          if(err)console.log(err)
          db.query(
            "UPDATE `artikel` SET `foto`=? WHERE `id` = ?",
            [filename, req.body.id_artikel],
            (err, result) => {
              if (err) console.log(err)
              var berhasil = "Foto artikel berhasil diedit"
              console.log(berhasil);
              db.query(
                'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error, profil) => {
                  db.query(
                    'SELECT * FROM `artikel` ORDER BY `id` DESC',(error, artikel) => {
                      res.render('../views/admin/index.ejs', {profil,artikel,page: 'artikel',berhasil});
                    }
                  );
                }
              );
            }
          )
        });
      }
    } else {
      console.log("nothing happen -"+req.body.submit+"-")
      res.redirect('/artikel')
    }

  },

  findAll : (req, res) => {
    const judul = req.query.judul;
    let condition = judul ? { judul: { [Op.like]: `%${judul}%` } } : null;

    Post.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while find post"
            });
        });
  },

  findOne : (req, res) => {
    const id = req.params.id;

    Post.findByPk(id)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: "Error retrieving post with id=" + id
            });
        });
  }
}