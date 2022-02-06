var db = require('../config/database')
var Db = require("../../database/models");
var sess;
var Post = Db.mahasiswa;
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
                        res.render('../views/admin/index.ejs', {profil, mahasiswa, berita, page: 'mahasiswaEdit'})
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
      var nama     = req.body.nama;
      var nim = req.body.nim;
      var jurusan       = req.body.jurusan;
      var bidang_minat       = req.body.bidang_minat;
      var nama_lomba       = req.body.nama_lomba;
      var peringkat       = req.body.peringkat;
      var pelaksana       = req.body.pelaksana;
      db.query(
        "UPDATE `mahasiswa` SET `nama`=?,`nim`=?,`jurusan`=?,`bidang_minat`=?,`nama_lomba`=?,`peringkat`=?,`pelaksana`=? , `beritum_id`=? WHERE `id` = ?",
        [nama, nim, jurusan,bidang_minat, nama_lomba,peringkat,pelaksana, req.body.id_berita, req.body.id],
        (err, result) => {
          if (err) console.log(err)
          res.redirect('/mahasiswa')
        }
      )
    }
  }
  // crud: (req, res) => {
  //     if (req.body.submit == "edit") {
  //       var id = req.body.id;
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