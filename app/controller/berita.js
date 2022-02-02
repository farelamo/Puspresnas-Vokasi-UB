const db = require('../config/database')
const Db = require("../../database/models");
const fs = require('fs');
const Post = Db.berita;
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
            const judul = req.query.judul;
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
                  berita: data,
                  page: 'berita'
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

      const id = req.body.id_berita;

    Post.findByPk(id)
      .then((data) => {
          const id = req.body.id_berita;

          Post.destroy({
            where: {
              id: id
            }
          }).then((result) => {
            if (result == 1) {
              console.log(data.foto)
              if (data.foto !== "") {
                var filePath = "public/assets/img/berita/" + data.foto;
                fs.unlinkSync(filePath);
                console.log("Foto berhasil dihapus");
              }
              var berhasil = "Berita berhasil dihapus"
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
                      const judul = req.query.judul;
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
                            berita: hasil,
                            berhasil,
                            page: 'berita'
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
        var filename = req.body.id_berita + ".png";
        file.mv("public/assets/img/berita/" + filename, function (err) {
          if (err) console.log(err)

          const id = req.body.id_berita;

          Post.update({
            foto: filename
          }, {
            where: {
              id: id
            }
          }).then((result) => {
            console.log(result)
            if (result == 1 || result == 0) {
              var berhasil = "Foto berita berhasil diedit"
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
                      const judul = req.query.judul;
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
                            berita: hasil,
                            berhasil,
                            page: 'berita'
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
      res.redirect('/berita')
    }

  },

  findAll: (req, res) => {

  },

  findOne: (req, res) => {
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

// const db = require('../config/database')
// const Db = require('../models')
// const fs = require('fs');
// const Post = Db.berita
// const Op = Db.Sequelize.Op
// var sess;

// module.exports = {
//   index: (req, res) => {
//     sess = req.session;
//     if (sess.id_user == undefined) {
//       res.redirect('login')
//     } else {
//       db.query(
//         'SELECT * FROM `user` WHERE `id`=(?)',
//         [sess.id_user],
//         (error, profil) => {
//           if (error) console.log(error)
//           else {
//             db.query(
//               'SELECT * FROM berita ORDER BY `id` DESC',
//               (error, berita) => {
//                 if (error) console.log(error)
//                 else {
//                   res.render('../views/admin/index.ejs', {
//                     profil,
//                     berita,
//                     page: 'berita'
//                   })
//                 }
//               }
//             )
//           }
//         }
//       )
//     }
//   },

//   crud: (req, res) => {
//     if (req.body.submit=="hapus") {
//       db.query(
//         "SELECT * FROM `berita` WHERE `id` = ?",[req.body.id_berita],(error, berita) => {
//           db.query(
//             "DELETE FROM `berita` WHERE `id` = ?",[req.body.id_berita],(err, result) => {
//               if (berita[0].foto!==""){
//                 var filePath = "public/assets/img/berita/"+berita[0].foto;
//                 fs.unlinkSync(filePath);
//                 console.log("Foto berhasil dihapus");
//               }
//               if (err) console.log(err)
//               var berhasil = "Berita berhasil dihapus"
//               console.log(berhasil);
//               db.query(
//                 'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error, profil) => {
//                   db.query(
//                     'SELECT * FROM `berita` ORDER BY `id` DESC',(error, berita) => {
//                       res.render('../views/admin/index.ejs', {profil,berita,page: 'berita',berhasil});
//                     }
//                   );
//                 }
//               );
//             }
//           )
//         }
//       );
//     }else if (req.body.submit=="foto") {
//       if (req.files) {
//         var file = req.files.foto;
//         var filename = req.body.id_berita+".png";
//         file.mv("public/assets/img/berita/"+filename,function(err){
//           if(err)console.log(err)
//           db.query(
//             "UPDATE `berita` SET `foto`=? WHERE `id` = ?",
//             [filename, req.body.id_berita],
//             (err, result) => {
//               if (err) console.log(err)
//               var berhasil = "Foto berita berhasil diedit"
//               console.log(berhasil);
//               db.query(
//                 'SELECT * FROM `user` WHERE `id`=(?)',[sess.id_user],(error, profil) => {
//                   db.query(
//                     'SELECT * FROM `berita` ORDER BY `id` DESC',(error, berita) => {
//                       res.render('../views/admin/index.ejs', {profil,berita,page: 'berita',berhasil});
//                     }
//                   );
//                 }
//               );
//             }
//           )
//         });
//       }
//     } else {
//       console.log("nothing happen -"+req.body.submit+"-")
//       res.redirect('/berita')
//     }

//   },

//   findAll : (req, res) => {
//     const judul = req.query.judul;
//     let condition = judul ? { judul: { [Op.like]: `%${judul}%` } } : null;

//     Post.findAll({ where: condition })
//         .then((data) => {
//             res.send(data);
//         }).catch((err) => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occured while find post"
//             });
//         });
//   },

//   findOne : (req, res) => {
//     const id = req.params.id;

//     Post.findByPk(id)
//         .then((data) => {
//             res.send(data);
//         }).catch((err) => {
//             res.status(500).send({
//                 message: "Error retrieving post with id=" + id
//             });
//         });
//   }

// }