var db = require('../config/database')
var fs = require('fs');
var Db = require('../../database/models')
var Post = Db.jenisLomba
var Op = Db.Sequelize.Op
var sess;

module.exports = {
  index: async (req, res) => {
    sess = req.session;
    if (sess.id_user == undefined) {
      res.redirect('login');
    } else {
      db.query(
        'SELECT * FROM `user` WHERE `id`=(?)',
        [sess.id_user],
        (error, profil) => {
          if (error) console.log(error)
          else {
            var jenis = req.query.jenis;
            var condition = jenis ? {
              jenis: {
                [Op.like]: `%${jenis}%`
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
                  jenis: data,
                  page: 'lombaAll'
                })
              }).catch((err) => {
                res.status(500).send({
                  message: err.message || "Some error occured while find post"
                });
              });

            // db.query(
            //   'SELECT * FROM jenis_lomba ORDER BY id DESC',
            //   (error, kategoriLomba) => {
            //     if (error) console.log(error)
            //     else {
            //       db.query(
            //         'SELECT * FROM bidang_lomba ORDER BY id DESC',
            //         (error, bidang) => {
            //           if (error) console.log(error)
            //           else {
            //             res.render('../views/admin/index.ejs', {
            //               profil,
            //               kategoriLomba,
            //               bidang,
            //               page: 'lombaAll'
            //             })
            //           }
            //         }
            //       )

            //     }
            //   }
            // )
          }
        }
      )
    }
  },

  crud: async (req, res) => {                /* HAPUS JENIS */
    if (req.body.submit == "hapus") {
      var id = req.body.id_lomba;

      Post.findByPk(id)
        .then((data) => {
          var id = req.body.id_lomba;

          Post.destroy({
            where: {
              id: id
            }
          }).then((result) => {
            if (result == 1) {
              console.log(data.gambar)
              if (data.foto !== "") {
                var filePath = "public/assets/img/jenisLomba/" + data.gambar;
                fs.unlinkSync(filePath);
                console.log("Foto berhasil dihapus");
              }
              var berhasil = "Lomba berhasil dihapus"
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
                      var condition = judul ? {
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
                            jenis: hasil,
                            berhasil,
                            page: 'lombaAll'
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
      //   'SELECT * FROM jenis_lomba WHERE id = ?',
      //   [req.body.id_lomba],
      //   (error, jenis) => {
      //     console.log(jenis[0].gambar)
      //     if (jenis[0].gambar !== ""){
      //       var filePath = "public/assets/img/jenisLomba/"+jenis[0].gambar;
      //       fs.unlinkSync(filePath);
      //       console.log("gambar berhasil dihapus");
      //     }
      //     db.query(
      //       "DELETE FROM `jenis_lomba` WHERE `id` = ?",
      //       [req.body.id_lomba],
      //       (err, haha) => {
      //         if (err) console.log(err)
      //         else {
      //          }
      //       }
      //     )
      //     res.redirect('/lombaAll')
      //   }
      // )
    } else if (req.body.submit == "gambar") {     /* EDIT GAMBAR JENIS */
      if (req.files) {
        // var file = req.files.gambar;
        // var filename = req.body.id_lomba + ".png";
        // file.mv("public/assets/img/jenisLomba/" + filename, function (err) {
        //   if (err) console.log(err)
        //   db.query(
        //     "UPDATE `jenis_lomba` SET `gambar` = ? WHERE `id` = ?",
        //     [filename, req.body.id_lomba],
        //     (err, result) => {
        //       if (err) console.log(err)
        //       res.redirect('/lombaAll')
        //     }
        //   )
        // });

        var file = req.files.gambar;
        var filename = req.body.IdGambar + ".png";
        file.mv("public/assets/img/jenisLomba/" + filename, function (err) {
          if (err) console.log(err)
          
          var id = req.body.IdGambar;

          Post.update({
            gambar: filename
          }, {
            where: {
              id: id
            }
          }).then((result) => {
            
            console.log(result)
            if (result == 1 || result == 0) {
              var berhasil = "Gambar Lomba berhasil diedit"
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
                      var condition = judul ? {
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
                            jenis: hasil,
                            berhasil,
                            page: 'lombaAll'
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
        })
      }

    } else if (req.body.submit == 'edit') {       /* EDIT BIDANG */
      sess = req.session;
      if (sess.id_user == undefined) {
        res.redirect('login');
      } else {
        db.query(
          'SELECT * FROM `user` WHERE `id`= ?',
          [sess.id_user],
          (error, profil) => {
            if (error) console.log(error)
            else {
              db.query(
                'SELECT * FROM bidang_lomba WHERE id_jenis = ?',
                [req.body.id],
                (error, bidang) => {
                  if (error) console.log(error)
                  else {
                    db.query(
                      'SELECT * FROM  jenis_lomba',
                      (error, jenisBidang) => {
                        if (error) console.log(error)
                        else {

                          var {
                            id
                          } = req.body

                          res.render('../views/admin/index.ejs', {
                            profil,
                            bidang,
                            jenisBidang,
                            id,
                            page: 'editBidang'
                          })
                        }
                      }
                    )
                  }
                })
            }
          })
      }
    } else {
      console.log("nothing happen -" + req.body.submit + "-")
      res.redirect('/lombaAll')
    }
  }
}