let db = require('../config/database')
let Db = require("../../database/models");
let sess;
let Post = Db.mahasiswa;
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
      let id          = req.body.id;
      let nama        = req.body.nama;
      let nim         = req.body.nim;
      let jurusan     = req.body.jurusan;
      let bidang_minat = req.body.bidang_minat;
      let jenis_lomba_id = req.body.jenis_lomba_id;
      let peringkat   = req.body.peringkat;
      db.query(
        "UPDATE `mahasiswa` SET `nama`=?,`nim`=?,`jurusan`=?,`bidang_minat`=?,`jenis_lomba_id`=?,`peringkat`=?, `beritum_id`=? WHERE `id` = ?",
        [nama, nim, jurusan,bidang_minat, jenis_lomba_id,peringkat, req.body.id_berita, req.body.id],
        (err, result) => {
          if (err) console.log(err)
          res.redirect('/mahasiswa')
        }
      )
    }
  }
  // crud: (req, res) => {
  //     if (req.body.submit == "edit") {
  //       let id = req.body.id;
  //       let nama     = req.body.nama;
  //       let nim = req.body.nim;
  //       let jurusan       = req.body.jurusan;
  //       let bidang_minat       = req.body.bidang_minat;
  //       let nama_lomba       = req.body.nama_lomba;
  //       let peringkat       = req.body.peringkat;
  //       let pelaksana       = req.body.pelaksana;
  //       let id_berita       = req.body.id_berita;

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