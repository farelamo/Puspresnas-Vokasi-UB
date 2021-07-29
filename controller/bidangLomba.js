const db = require('../config/database')
var sess;
const Db = require('../models')
const Post = Db.bidangLomba
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
              'SELECT * FROM jenis_lomba',
              (error, jenisLomba) => {
                if (error) console.log(error)
                else {
                  db.query(
                    'SELECT * FROM bidang_lomba',
                    (error, tag) => {
                      if (error) console.log(error)
                      else {
                        res.render('../views/admin/index.ejs', {
                          profil,
                          jenisLomba,
                          tag,
                          page: 'bidangLomba'
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
        hadiah,
        biaya,
        desk,
        link,
        namaLomba
      } = req.body

      var file = req.files.berkas
      var filename = file.name;
      file.mv("public/assets/bidangLomba/" + filename, function (err) {
        if (err) console.log(err)
        else {
          var gambar = req.files.gambar
          var namaGambar = gambar.name
          file.mv("public/assets/img/bidangLomba/" + namaGambar, ((error) => {
            if (error) console.log(error)
            db.query(
              "INSERT INTO `bidang_lomba` (`nama_bidang`, `desk`, `biaya`, `hadiah`, `link`, `file`, `id_jenis`, `gambar`) VALUES (?,?,?,?,?,?,?,?)",
              [
                nama, desk, biaya, hadiah, link, filename, namaLomba, namaGambar
              ],
              (err, bidangLomba) => {
                if (err) console.log(err)
                else {
                  res.redirect('/lombaAll')
                }
              }
            )
          }))
        }
      });
    }
  },

  findAll: (req, res) => {
    const nama_bidang = req.query.nama_bidang
    let condition = nama_bidang ? {
      nama_bidang: {
        [Op.like]: `%${nama_bidang}%`
      }
    } : null

    Post.findAll({
        where: condition
      })
      .then((data) => {
        res.send(data)
      }).catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while find post"
        })
      })
  },

  findOne: (req, res) => {
    const id = req.params.id

    Post.findByPk(id)
      .then((data) => {
        res.send(data)
      }).catch((err) => {
        res.status(500).send({
          message: "Error retrieving post with id=" + id
        })
      })
  }
}