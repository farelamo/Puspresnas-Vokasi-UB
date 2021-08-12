const db = require('../config/database')
const fs = require('fs');
var sess;
const Db = require('../models')
const Post = Db.jenisLomba
const PostCat = Db.kategoriLomba
const PostTagLomba = Db.tagLomba
const PostTag = Db.tag
const Op = Db.Sequelize.Op

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
          if (error) console.log(error)
          else {
            db.query(
              'SELECT * FROM `jenis_lomba` WHERE `id` = ?',
              [req.params.id],
              (error, jenis) => {
                if (error) console.log(error)
                else {
                  db.query(
                    "SELECT TRIM(TRAILING ')' FROM SUBSTRING(COLUMN_TYPE,6)) as tipes FROM information_schema.COLUMNS WHERE TABLE_NAME='jenis_lomba' AND COLUMN_NAME='tipe'",
                    (error, type) => {
                      if (error) console.log(error)
                      else {
                        db.query(
                          'SELECT * FROM `kategori_lomba`',
                          (error, kategoriLomba) => {
                            if (error) console.log(error)
                            else {
                              db.query(
                                'SELECT * FROM `tag_lomba`',
                                (error, tagLomba) => {
                                  if (error) console.log(error)
                                  else {
                                    db.query(
                                      'SELECT `tag_lomba_id` FROM `tag` WHERE `jenis_lomba_id`= ?',
                                      [req.params.id],
                                      (error, hasil) => {

                                        if (error) console.log(error)
                                        else {
                                          var tag = hasil.map(tags => tags.tag_lomba_id)

                                          let enumVal = type[0]['tipes'];
                                          let tempString = enumVal.replace(/\'/g, '');
                                          enumArray = tempString.split(',');

                                          const {
                                            id,
                                          } = req.body

                                          res.render('../views/admin/index.ejs', {
                                            profil,
                                            jenis,
                                            enumArray,
                                            kategoriLomba,
                                            tagLomba,
                                            tag,
                                            id,
                                            page: 'editJenis'
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
                    }
                  )
                }
              }
            )
          }
        }
      );
    }
  },

  edit: (req, res) => {
    if (req.body.submit == "edit") {
      const {
        nama,
        sumber,
        tanggal,
        desk,
        tipe,
        kategoriLomba,
        tag
      } = req.body

      db.query(
        'UPDATE jenis_lomba SET nama_lomba = ?, sumber = ?, desk = ?, tipe = ?, kategori_lomba_id = ?, tanggal = ? WHERE id = ?',
        [nama, sumber, desk, tipe, kategoriLomba, tanggal, req.params.id],
        (error, edit) => {
          if (error) console.log(error)
          else {
            db.query(
              'DELETE FROM `tag` WHERE `jenis_lomba_id` = ?',
              [req.params.id],
              (error, hapus) => {
                if (error) console.log(error)
                else {

                  // console.log(tag)
                  
                   if (Array.isArray(tag)) {
                    tag.forEach((tags) => {
                      db.query(
                        'INSERT INTO `tag` (`tag_lomba_id`,`jenis_lomba_id`) VALUES (?,?)',
                        [tags, req.params.id],
                        (error, tagjenis) => {
                          if (error) console.log(error)
                        }
                      )
                    })
                  } else if (!Array.isArray(tag)) {
                    //var hasil = tag.length[0]
                    db.query(
                      'INSERT INTO `tag` (`tag_lomba_id`,`jenis_lomba_id`) VALUES (?,?)',
                      [tag, req.params.id],
                      (error, haha) => {
                        if (error) console.log(error)
                      }
                    )
                  }
                  res.redirect('/lombaAll')
                }
              }
            )
            
          // const id = req.params.id;

          // PostTag.destroy({
          //   where: {
          //     jenis_lomba_id: id
          //   }
          // }).then((result) => {
          //   if (result == 1 || result == 0) {
          //   console.log(req.params.id)
            
          //   if (Array.isArray(tag)) {
          //     tag.forEach((tags) => {
          //       const isi = {
          //         jenis_lomba_id: req.params.id,
          //         tag_lomba_id: tags
          //       }
          //       PostTag.create(isi)
          //         .then((hasil) => {
          //           res.redirect('/lombaAll')
          //         })
          //         .catch((err) => {
          //           res.status(500).send({
          //             message: err.message || "Some error occurred while creating the Post."
          //           })
          //         })
          //     })
          //   } else if (!Array.isArray(tag)) {
          //     const isi = {
          //       jenis_lomba_id: req.params.id,
          //       tag_lomba_id: tag
          //     };
          //     PostTag.create(isi)
          //       .then((hasil) => {
          //         res.redirect('/lombaAll')
          //       })
          //       .catch((err) => {
          //         res.status(500).send({
          //           message: err.message || "Some error occurred while creating the Post."
          //         })
          //       })
          //   }
          //   } else {
          //     res.send({
          //       message: `Cannot delete post with id=${id}`
          //     })
          //   }
          // }).catch((err) => {
          //   res.status(500).send({
          //     message: "Could not delete post with id=" + id
          //   })
          // })


            // db.query(
            //   'UPDATE tag INNER JOIN tag_lomba ON tag.tag_lomba_id = tag_lomba.id SET tag.tag_lomba_id = (?) WHERE tag.jenis_lomba_id = (?)',
            //   [tag,req.params.id],
            //   (err, result) => {
            //     if(error) console.log(error)
            //     else {
            //       res.redirect('/lombaAll')
            //     }
            //   }
            // )

          }
        }
      )
    }
  }
}