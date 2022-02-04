const db = require('../config/database')
const Db = require("../models");
var sess;
const Post = Db.mahasiswa;
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
              "SELECT * FROM `mahasiswa` WHERE `id`=?",
              [req.params.id],
              (error, mahasiswa) => {
                if (error) console.log(error)
                else {
                  db.query(
                    'SELECT * FROM berita',
                    (error, berita) => {
                      if (error) console.log(error)
                      else {
                        db.query(
                          'SELECT * FROM jenis_lomba',
                          (error, jenis_lomba) => {
                            if (error) console.log(error)
                            else {
                              res.render('../views/admin/index.ejs', {profil, mahasiswa, jenis_lomba, berita, page: 'mahasiswaEdit'})
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
  },

  crud: (req, res) => {
    if (req.body.submit=="edit") {
      var id          = req.body.id;
      var nama        = req.body.nama;
      var nim         = req.body.nim;
      var jurusan     = req.body.jurusan;
      var bidang_minat = req.body.bidang_minat;
      var jenis_lomba_id = req.body.jenis_lomba_id;
      var peringkat   = req.body.peringkat;
      db.query(
<<<<<<< Updated upstream:controller/mahasiswaEdit.js
        "UPDATE `mahasiswa` SET `nama`=?,`nim`=?,`jurusan`=?,`bidang_minat`=?,`nama_lomba`=?,`peringkat`=?,`pelaksana`=? , `id_berita`=? WHERE `id` = ?",
        [nama, nim, jurusan,bidang_minat, nama_lomba,peringkat,pelaksana, req.body.id_berita, req.body.id],
=======
        "UPDATE `mahasiswa` SET `nama`=?,`nim`=?,`jurusan`=?,`bidang_minat`=?,`jenis_lomba_id`=?,`peringkat`=?, `beritum_id`=? WHERE `id` = ?",
        [nama, nim, jurusan,bidang_minat, jenis_lomba_id,peringkat, req.body.id_berita, req.body.id],
>>>>>>> Stashed changes:app/controller/mahasiswaEdit.js
        (err, result) => {
          if (err) console.log(err)
          res.redirect('/mahasiswa')
        }
      )
    }
  }
  // crud: (req, res) => {
  //     if (req.body.submit == "edit") {
  //       const id = req.body.id;
  //       var nama     = req.body.nama;
  //       var nim = req.body.nim;
  //       var jurusan       = req.body.jurusan;
  //       var bidang_minat       = req.body.bidang_minat;
  //       var nama_lomba       = req.body.nama_lomba;
  //       var peringkat       = req.body.peringkat;
  //       var pelaksana       = req.body.pelaksana;
  //       var id_berita       = req.body.id_berita;

  //       Post.update({
  //         nama: nama,
  //         nim: nim,
  //         jurusan: jurusan,
  //         bidang_minat: bidang_minat,
  //         nama_lomba: nama_lomba,
  //         peringkat: peringkat,
  //         pelaksana: pelaksana,
  //         id_berita: id_berita,
  //       }, {
  //         where: {
  //           id: id
  //         }
  //       }).then((result) => {
  //         console.log(result)
  //         if (result == 1 || result == 0) {
  //           res.redirect('/mahasiswa')
  //         } else {
  //           res.send({
  //             message: `Cannot update Mahasiswa with id=${id}.`
  //           })
  //         }
  //       }).catch((err) => {
  //         res.status(500).send({
  //           message: "Error updating Mahasiswa with id=" + id
  //         })
  //       })
  //   }
  // }
}