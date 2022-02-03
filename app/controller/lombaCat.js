var db = require('../config/database')
var sess;
var Db = require('../../database/models')
var Post = Db.kategoriLomba
var Op = Db.Sequelize.Op

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
            var kategori = req.query.kategori
            let condition = kategori ? {
              kategori: {
                [Op.like]: `%${kategori}%` 
               
              }
            } : null

            Post.findAll({
              order: [['id', 'DESC']],
                where: condition,
                
                // attributes: ['kategori']
              })
              .then((data) => {
                res.render('../views/admin/index.ejs', {
                  isi: data,
                  profil,
                  page: 'lombaCat'
                })
              }).catch((err) => {
                res.status(500).send({
                  message: err.message || "Some error occured while find post"
                })
              })
          }
        }
      )
    }
  },

  kondisi: async (req, res) => {
    if (req.body.submit == 'tambah') {
      var post = {
        kategori: req.body.lombas
    };

    await Post.create(post)
        .then((data) => {res.redirect('/lombaCat')})
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Post."
          })
      })
    } else if (req.body.submit == 'edit') {

      var id = req.body.id;
      var lomba = req.body.lomba;

      await Post.update({kategori: lomba}, {
          where: {id: id}
      }).then((result) => {
        console.log(result);
          if ( result == 1 || result == 0 ) {
            res.redirect('/lombaCat')
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
    } else {
      var id = req.body.id;

      await Post.destroy({
          where: { id: id }
      }).then((result) => {
          if (result == 1 || result == 0) {
              res.redirect('/lombaCat')
          } else {
              res.send({
                  message: `Cannot delete post with id=${id}`
              })
          }
      }).catch((err) => {
          res.status(500).send({
              message: "Could not delete post with id=" + id
          })
      })
    }
  }
}