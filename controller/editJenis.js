const db = require('../config/database')
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
                                      'SELECT `id_tag_lomba` FROM `tag` WHERE `id_jenis`= ?',
                                      [req.params.id],
                                      (error, hasil) => {

                                        if (error) console.log(error)
                                        else {
                                          var tag = hasil.map(tags => tags.id_tag_lomba)

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
        'UPDATE jenis_lomba SET nama_lomba = ?, sumber = ?, desk = ?, tipe = ?, id_kategori = ?, tanggal = ? WHERE id = ?',
        [nama, sumber, desk, tipe, kategoriLomba, tanggal, req.params.id],
        (error, edit) => {
          if (error) console.log(error)
          else {
            db.query(
              'DELETE FROM `tag` WHERE id_jenis = ?',
              [req.params.id],
              (error, hapus) => {
                if (error) console.log(error)
                else {

                  console.log(tag)
                  
                   if (Array.isArray(tag)) {
                    tag.forEach((tags) => {
                      db.query(
                        'INSERT INTO `tag` (`id_jenis`,`id_tag_lomba`) VALUES (?,?)',
                        [req.params.id, tags],
                        (error, tagjenis) => {
                          if (error) console.log(error)
                        }
                      )
                    })
                  } else if (!Array.isArray(tag)) {
                    //var hasil = tag.length[0]
                    db.query(
                      'INSERT INTO `tag` (`id_jenis`,`id_tag_lomba`) VALUES (?,?)',
                      [req.params.id, tag],
                      (error, haha) => {
                        if (error) console.log(error)
                      }
                    )
                  }
                  res.redirect('/lombaAll')
                }
              }
            )

          }
        }
      )
    }
  }
}