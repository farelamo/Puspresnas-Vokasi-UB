const db = require('../config/database')
var sess;
const Db = require('../models')
const Post = Db.berita
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
              'SELECT * FROM berita ORDER BY `id` DESC',
              (error, berita) => {
                if (error) console.log(error)
                else {
                  res.render('../views/admin/index.ejs', {
                    profil,
                    berita,
                    page: 'berita'
                  })
                }
              }
            )
          }
        }
      )
    }
  },

  crud: (req, res) => {
    if (req.body.submit=="hapus") {
      db.query(
        "DELETE FROM `berita` WHERE `id` = ?",
        [req.body.id_berita],
        (err, result) => {
          if (err) console.log(err)
          res.redirect('/berita')
        }
      )
    }else if (req.body.submit=="foto") {
      if (req.files) {
        var file = req.files.foto;
        var filename = req.body.id_berita+".png";
        file.mv("public/assets/img/berita/"+filename,function(err){
          if(err)console.log(err)
          db.query(
            "UPDATE `berita` SET `foto`=? WHERE `id` = ?",
            [filename, req.body.id_berita],
            (err, result) => {
              if (err) console.log(err)
              res.redirect('/berita')
            }
          )
        });
      }
    } else {
      console.log("nothing happen -"+req.body.submit+"-")
      res.redirect('/berita')
    }

  },

  findAll : (req, res) => {
    const judul = req.query.judul;
    let condition = judul ? { judul: { [Op.like]: `%${judul}%` } } : null;

    Post.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while find post"
            });
        });
  },

  findOne : (req, res) => {
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