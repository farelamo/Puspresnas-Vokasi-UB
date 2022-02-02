const db = require('../config/database')
var sess;
const Db = require('../../database/models')
const Post = Db.jenisLomba
const PostCat = Db.kategoriLomba
const PostTagLomba = Db.tagLomba
const PostTag = Db.tag
const Op = Db.Sequelize.Op

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
            const kategori = req.query.kategori
            let condition = kategori ? {
              kategori: {
                [Op.like]: `%${kategori}%`
              }
            } : null

            PostCat.findAll({
                where: condition
              })
              .then((kategori) => {
                const tag = req.query.tag
                let condition = tag ? {
                  tag: {
                    [Op.like]: `%${tag}%`
                  }
                } : null

                PostTagLomba.findAll({
                    where: condition
                  })
                  .then((Tag) => {
                    res.render('../views/admin/index.ejs', {
                      profil,
                      kategoriLomba: kategori,
                      tag: Tag,
                      page: 'jenisLomba'
                    })
                  }).catch((err) => {
                    res.status(500).send({
                      message: err.message || "Some error occured while find post"
                    })
                  })
              }).catch((err) => {
                res.status(500).send({
                  message: err.message || "Some error occured while find post"
                })
              })

            // db.query(
            //   'SELECT * FROM kategori_lomba',
            //   (error, kategoriLomba) => {
            //     if (error) console.log(error)
            //     else {
            //       db.query(
            //         'SELECT * FROM tag_lomba',
            //         (error, tag) => {
            //           if (error) console.log(error)
            //           else {
            //             res.render('../views/admin/index.ejs', {
            //               profil,
            //               kategoriLomba,
            //               tag,
            //               page: 'jenisLomba'
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

  tambah: (req, res) => {
    if (req.body.submit == "tambah") {

      const {
        nama,
        sumber,
        desk,
        tipe,
        kategoriLomba,
        tanggal,
        tag
      } = req.body

        const post = {
          nama_lomba: nama,
          sumber: sumber,
          desk: desk,
          tipe: tipe,
          kategori_lomba_id: kategoriLomba,
          tanggal: tanggal,
          gambar: '',
        };

        Post.create(post)
          .then((data) => {
            console.log(data.id)
            
            if (Array.isArray(tag)) {
              tag.forEach((tags) => {
                const isi = {
                  jenis_lomba_id: data.id,
                  tag_lomba_id: tags
                }
                PostTag.create(isi)
                  .then((hasil) => {
                    res.redirect('/lombaAll')
                  })
                  .catch((err) => {
                    res.status(500).send({
                      message: err.message || "Some error occurred while creating the Post."
                    })
                  })
              })
            } else if (!Array.isArray(tag)) {
              const isi = {
                jenis_lomba_id: data.id,
                tag_lomba_id: tag
              };
              PostTag.create(isi)
                .then((hasil) => {
                  res.redirect('/lombaAll')
                })
                .catch((err) => {
                  res.status(500).send({
                    message: err.message || "Some error occurred while creating the Post."
                  })
                })
            }

            // db.query(
            //   'DELETE FROM `tag` WHERE id_jenis = ?',
            //   [id],
            //   (error, hapus) => {
            //     if (error) console.log(error)
            //     else {
            //       console.log(tag)

            //       if (Array.isArray(tag)) {
            //         tag.forEach((tags) => {
            //           db.query(
            //             'INSERT INTO `tag` (`id_jenis`,`id_tag_lomba`) VALUES (?,?)',
            //             [id, tags],
            //             (error, tagjenis) => {
            //               if (error) console.log(error)
            //             }
            //           )
            //         })
            //       } else if (!Array.isArray(tag)) {
            //         db.query(
            //           'INSERT INTO `tag` (`id_jenis`,`id_tag_lomba`) VALUES (?,?)',
            //           [id, tag],
            //           (error, haha) => {
            //             if (error) console.log(error)
            //           }
            //         )
            //       }
            //       res.redirect('/lombaAll')
            //     }
            //   }
            // )
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "Some error occurred while creating the Post."
            })
          })
        // db.query(
        //   "INSERT INTO `jenis_lomba` (`nama_lomba`,`sumber`,`desk`,`tipe`,`kategori_lomba_id`,`tanggal`,`gambar`) VALUES (?,?,?,?,?,?,?)",
        //   [
        //     nama, sumber, desk, tipe, kategoriLomba, tanggal, filename
        //   ],
        //   (err, jenisLomba) => {
        //     if (err) console.log(err)
        //     else {
        //       console.log(tag)
        //       var jenis = jenisLomba.insertId;

        //       db.query(
        //         'DELETE FROM `tag` WHERE id_jenis = ?',
        //         [jenis],
        //         (error, hapus) => {
        //           if (error) console.log(error)
        //           else {
        //             console.log(tag)

        //             if (Array.isArray(tag)) {
        //               tag.forEach((tags) => {
        //                 db.query(
        //                   'INSERT INTO `tag` (`id_jenis`,`id_tag_lomba`) VALUES (?,?)',
        //                   [jenis, tags],
        //                   (error, tagjenis) => {
        //                     if (error) console.log(error)
        //                   }
        //                 )
        //               })
        //             } else if (!Array.isArray(tag)) {
        //               db.query(
        //                 'INSERT INTO `tag` (`id_jenis`,`id_tag_lomba`) VALUES (?,?)',
        //                 [jenis, tag],
        //                 (error, haha) => {
        //                   if (error) console.log(error)
        //                 }
        //               )
        //             }
        //             res.redirect('/lombaAll')
        //           }
        //         }
        //       )
        //     }
        //   }
        // )
      
    }
  },

  findAll: (req, res) => {
    const nama_lomba = req.query.nama_lomba
    let condition = nama_lomba ? {
      nama_lomba: {
        [Op.like]: `%${nama_lomba}%`
      }
    } : null

    Post.findAll({
        where: condition
      })
      .then((data) => {
        res.send(data)
      }).catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occured while find post"
        })
      })
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