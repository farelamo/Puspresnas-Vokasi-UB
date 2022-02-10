var db = require('../config/database')
var Db = require("../../database/models");
var sess;
var Post = Db.artikel;
var date_ob = new Date();
var date = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
var datenow = year + "-" + month + "-" + date;

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
            var id = req.params.id_artikel;

            Post.findByPk(id)
              .then((hasil) => {
                db.query(
                  'SELECT * FROM kategori_konten',
                  (error, kategori) => {
                    if (error) console.log(error)
                    else {
                      
                      res.render('../views/admin/index.ejs', {
                        profil,
                        artikel: hasil,
                        kategori,
                        page: 'artikelEdit'
                      })
                    }
                  }
                )
              }).catch((err) => {
                res.status(500).send({
                  message: "Error retrieving post with id=" + id
                });
              });
          }
        }
      )
    }

    // sess = req.session;
    // if (sess.id_user == undefined) {
    //   res.redirect('login')
    // } else {
    //   db.query(
    //     'SELECT * FROM `user` WHERE `id`=(?)',
    //     [sess.id_user],
    //     (error, profil) => {
    //       if (error) console.log(error)
    //       else {
    //         db.query(
    //           "SELECT * FROM `artikel` WHERE `id`=?",
    //           [req.params.id_artikel],
    //           (error, artikel) => {
    //             if (error) console.log(error)
    //             else {
    //               db.query(
    //                 'SELECT * FROM kategori_konten',
    //                 (error, kategori) => {
    //                   if (error) console.log(error)
    //                   else {
    //                     res.render('../views/admin/index.ejs', {profil, artikel, kategori, page: 'artikelEdit'})
    //                   }
    //                 }
    //               )
    //             }
    //           }
    //         )
    //       }
    //     }
    //   )
    // }
  },

  crud: (req, res) => {
    if (req.body.submit == "edit") {

      var id = req.body.id_artikel;
      var judul = req.body.judul;
      var deskripsi = req.body.deskripsi;
      var isi = req.body.isi;
      var kategori = req.body.id_kategori

      Post.update({
        judul: judul,
        deskripsi: deskripsi,
        isi: isi,
        kategori_konten_id: kategori
      }, {
        where: {
          id: id
        }
      }).then((result) => {
        console.log(result)
        if (result == 1 || result == 0) {
          res.redirect('/artikel')
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
      // var judul = req.body.judul;
      // var deskripsi = req.body.deskripsi;
      // var isi = req.body.isi;
      // db.query(
      //   "UPDATE `artikel` SET `judul`=?,`deskripsi`=?,`isi`=?,`id_kategori`=? WHERE `id` = ?",
      //   [judul, deskripsi, isi, req.body.id_kategori, req.body.id_artikel],
      //   (err, result) => {
      //     if (err) console.log(err)
      //     res.redirect('/artikel')
      //   }
      // )
    }
  }
}