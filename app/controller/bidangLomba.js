let db = require('../config/database')
let sess;
let Db = require('../../database/models')
let Post = Db.bidangLomba
let Op = Db.Sequelize.Op

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

      let {
        nama,
        hadiah,
        biaya,
        desk,
        link,
      } = req.body


      db.query(
        "INSERT INTO `bidang_lomba` (`nama_bidang`, `desk`, `biaya`, `hadiah`, `link`, `file`, `jenis_lomba_id`, `gambar`) VALUES (?,?,?,?,?,?,?,?)",
        [
          nama, desk, biaya, hadiah, link, '', req.params.id, ''
        ],
        (err, bidangLomba) => {
          if (err) console.log(err)
          else {
            console.log(bidangLomba.insertId)
            let file = req.files.berkas
            let filename = bidangLomba.insertId + '.pdf';
            file.mv("public/assets/bidangLomba/" + filename, function (err) {

              if (err) console.log(err)
              else {
                let gambar = req.files.gambar
                let namaGambar = bidangLomba.insertId + '.png'
                gambar.mv("public/assets/img/bidangLomba/" + namaGambar, ((error) => {

                  if (error) console.log(error)
                  else {
                    db.query(
                      'UPDATE `bidang_lomba` SET  `file` = (?), `gambar`= (?) WHERE `id` = (?)',
                      [filename, namaGambar, bidangLomba.insertId],
                      (err, hasil) => {
                        if (error) console.log(error)
                        else {
                          res.redirect('/bidangAll/' + req.params.id)
                        }
                      }
                    )
                    // res.redirect('/bidangAll/' + req.params.id)
                  }

                }))

              }
            });
          }
        }
      )

    }
  },

  findAll: (req, res) => {
    let nama_bidang = req.query.nama_bidang
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
    let id = req.params.id

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