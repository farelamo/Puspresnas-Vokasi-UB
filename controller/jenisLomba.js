const db = require('../config/database')
var sess;
const Db = require('../models')
const Post = Db.jenisLomba
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
            db.query(
              'SELECT * FROM kategori_lomba',
              (error, kategoriLomba) => {
                if (error) console.log(error)
                else {
                  db.query(
                    'SELECT * FROM tag_lomba',
                    (error, tag) => {
                      if (error) console.log(error)
                      else {
                        res.render('../views/admin/index.ejs', {
                          profil,
                          kategoriLomba,
                          tag,
                          page: 'jenisLomba'
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

      var file = req.files.gambar;
      var filename = file.name;
      file.mv("public/assets/img/jenisLomba/" + filename, ((error) => {
      db.query(
        "INSERT INTO `jenis_lomba` (`nama_lomba`,`sumber`,`desk`,`tipe`,`id_kategori`,`tanggal`,`gambar`) VALUES (?,?,?,?,?,?,?)",
        [
          nama, sumber, desk, tipe, kategoriLomba, tanggal, filename
        ],
        (err, jenisLomba) => {
          if (err) console.log(err)
          else {
            console.log(tag)
            var jenis = jenisLomba.insertId;

            db.query(
              'DELETE FROM `tag` WHERE id_jenis = ?',
              [jenis],
              (error, hapus) => {
                if (error) console.log(error)
                else {
                  console.log(tag)
                  
                   if (Array.isArray(tag)) {
                    tag.forEach((tags) => {
                      db.query(
                        'INSERT INTO `tag` (`id_jenis`,`id_tag_lomba`) VALUES (?,?)',
                        [jenis, tags],
                        (error, tagjenis) => {
                          if (error) console.log(error)
                        }
                      )
                    })
                  } else if (!Array.isArray(tag)) {
                    db.query(
                      'INSERT INTO `tag` (`id_jenis`,`id_tag_lomba`) VALUES (?,?)',
                      [jenis, tag],
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
      }))
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