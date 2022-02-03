var db = require('../config/database')
var Db = require("../../database/models");
var fs = require('fs');
var Post = Db.artikel;
var Op = Db.Sequelize.Op;
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
            var judul = req.query.judul;
            let condition = judul ? {
              judul: {
                [Op.like]: `%${judul}%`
              }
            } : null;

            Post.findAll({
                order: [
                  ['id', 'DESC']
                ],
                where: condition
              })
              .then((data) => {
                res.render('../views/admin/index.ejs', {
                  profil,
                  artikel: data,
                  page: 'artikel'
                })
              }).catch((err) => {
                res.status(500).send({
                  message: err.message || "Some error occured while find post"
                });
              });
          }
        }
      )
    }
  },

  crud: async (req, res) => {
    if (req.body.submit == "hapus") {

      var id = req.body.id_artikel;

      Post.findByPk(id)
        .then((data) => {
          var id = req.body.id_artikel;

          Post.destroy({
            where: {
              id: id
            }
          }).then((result) => {
            if (result == 1) {
              console.log(data.foto)
              if (data.foto !== "") {
                var filePath = "public/assets/img/artikel/" + data.foto;
                fs.unlinkSync(filePath);
                console.log("Foto berhasil dihapus");
              }
              var berhasil = "Artikel berhasil dihapus"
              console.log(berhasil);
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
                      var judul = req.query.judul;
                      let condition = judul ? {
                        judul: {
                          [Op.like]: `%${judul}%`
                        }
                      } : null;

                      Post.findAll({
                          order: [
                            ['id', 'DESC']
                          ],
                          where: condition
                        })
                        .then((hasil) => {
                          res.render('../views/admin/index.ejs', {
                            profil,
                            artikel: hasil,
                            berhasil,
                            page: 'artikel'
                          })
                        }).catch((err) => {
                          res.status(500).send({
                            message: err.message || "Some error occured while find post"
                          });
                        });
                    }
                  }
                )
              }
            } else {
              res.send({
                message: `Cannot delete post with id=${id}`
              })
            }
          }).catch((err) => {
            res.status(500).send({
              message: "Could not delete post with id=" + id
            })
          })
        }).catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occured while find post"
          });
        });

      // db.query(
      //   "SELECT * FROM `artikel` WHERE `id` = ?",[req.body.id_artikel],(error, artikel) => {
      //     db.query(
      //       "DELETE FROM `artikel` WHERE `id` = ?",[req.body.id_artikel],(err, result) => {
      //         if (artikel[0].foto!==""){
      //           var filePath = "public/assets/img/artikel/"+artikel[0].foto;
      //           fs.unlinkSync(filePath);
      //           console.log("Foto berhasil dihapus");
      //         }
      //         if (err) console.log(err)
      //         var berhasil = "Artikel berhasil dihapus"
      //         console.log(berhasil);
      //         db.query(
      //           'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error, profil) => {
      //             db.query(
      //               'SELECT * FROM `artikel` ORDER BY `id` DESC',(error, artikel) => {
      //                 res.render('../views/admin/index.ejs', {profil,artikel,page: 'artikel',berhasil});
      //               }
      //             );
      //           }
      //         );
      //       }
      //     )
      //   }
      // );

    } else if (req.body.submit == "foto") {
      if (req.files) {
        var file = req.files.foto;
        var filename = req.body.id_artikel + ".png";
        file.mv("public/assets/img/artikel/" + filename, function (err) {
          if (err) console.log(err)

          var id = req.body.id_artikel;

          Post.update({
            foto: filename
          }, {
            where: {
              id: id
            }
          }).then((result) => {
            console.log(filename)
            console.log(result)
            if (result == 1 || result == 0) {
              var berhasil = "Foto artikel berhasil diedit"
              console.log(berhasil);

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
                      var judul = req.query.judul;
                      let condition = judul ? {
                        judul: {
                          [Op.like]: `%${judul}%`
                        }
                      } : null;

                      Post.findAll({
                          order: [
                            ['id', 'DESC']
                          ],
                          where: condition
                        })
                        .then((hasil) => {
                          res.render('../views/admin/index.ejs', {
                            profil,
                            artikel: hasil,
                            berhasil,
                            page: 'artikel'
                          })
                        }).catch((err) => {
                          res.status(500).send({
                            message: err.message || "Some error occured while find post"
                          });
                        });
                    }
                  }
                )
              }
            } else {
              res.send({
                message: `Cannot update Post with id=${id}.`
              })
            }
          }).catch((err) => {
            res.status(500).send({
              message: "Error updating post with id=" + id
            })
          })

          // db.query(
          //   "UPDATE `artikel` SET `foto`=? WHERE `id` = ?",
          //   [filename, req.body.id_artikel],
          //   (err, result) => {
          //     if (err) console.log(err)
          //     var berhasil = "Foto artikel berhasil diedit"
          //     console.log(berhasil);
          //     db.query(
          //       'SELECT * FROM `user` WHERE `id`=(?)', [sess.id_user], (error, profil) => {
          //         db.query(
          //           'SELECT * FROM `artikel` ORDER BY `id` DESC', (error, artikel) => {
          //             res.render('../views/admin/index.ejs', {
          //               profil,
          //               artikel,
          //               page: 'artikel',
          //               berhasil
          //             });
          //           }
          //         );
          //       }
          //     );
          //   }
          // )
        });
      }
    } else {
      console.log("nothing happen -" + req.body.submit + "-")
      res.redirect('/artikel')
    }
  }
}