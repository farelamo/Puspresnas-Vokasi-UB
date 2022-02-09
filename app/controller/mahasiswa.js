let db = require('../config/database')
let Db = require("../../database/models")
let Post = Db.mahasiswa
let Op = Db.Sequelize.Op
let sess

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
              'SELECT * FROM mahasiswa ',
              (error, mahasiswa) => {
                if (error) console.log(error)
                else {
                  db.query(
                    'SELECT * FROM jenis_lomba',
                    (error, jenis_lomba) => {
                      if (error) console.log(error)
                      else {
                        res.render('../views/admin/index.ejs', {profil, mahasiswa, jenis_lomba, page: 'mahasiswa'})
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
    if (req.body.submit=="hapus") {
      db.query(
        "DELETE FROM `mahasiswa` WHERE `id` = ?",
        [req.body.id_mahasiswa],
        (err, result) => {
          if (err) console.log(err)
          res.redirect('/mahasiswa')
        }
      )
    }else if (req.body.submit=="foto") {
      if (req.files) {
        let file = req.files.foto;
        let filename = req.body.id_mahasiswa+".png";
        file.mv("public/assets/img/mahasiswa/"+filename,function(err){
          if(err)console.log(err)
          db.query(
            "UPDATE `mahasiswa` SET `foto`=? WHERE `id` = ?",
            [filename, req.body.id_mahasiswa],
            (err, result) => {
              if (err) console.log(err)
              res.redirect('/mahasiswa')
            }
          )
        });
      }
    } else {
      console.log("nothing happen -"+req.body.submit+"-")
      res.redirect('/mahasiswa')
    }

  },

  findAll : (req, res) => {
    let judul = req.query.judul;
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
    let id = req.params.id;

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