const db = require('../config/database')
var sess;
const Db = require('../../database/models')
const Post = Db.tagLomba
const PostCat = Db.kategoriLomba
const Op = Db.Sequelize.Op

module.exports = {
  index: async (req, res) => {
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
            const tag = req.query.tag
            let condition = tag ? {
              tag: {
                [Op.like]: `%${tag}%`
              }
            } : null

            Post.findAll({
                order: [
                  ['id', 'DESC']
                ],
                where: condition,
                include: [{
                  model: PostCat,
                  required: false,
                 
                }]
              })

              .then((tags) => {
                const kategori = req.query.kategori
                let kondition = kategori ? {
                  kategori: {
                    [Op.like]: `%${kategori}%`

                  }
                } : null

                PostCat.findAll({
                    order: [
                      ['id', 'DESC']
                    ],
                    where: kondition,

                    // attributes: ['kategori']
                  })
                  .then((data) => {
                    res.render('../views/admin/index.ejs', {
                      kategori: data,
                      tag: tags,
                      profil,
                      page: 'lombaTag'
                    })
                  }).catch((err) => {
                    res.status(500).send({
                      message: err.message || "Some error occured while find post"
                    })
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
      const post = {
        tag: req.body.tag,
        kategori_lomba_id: req.body.kategoriLomba
      };

      Post.create(post, {
          include: [PostCat]
        })
        .then((data) => {
          res.redirect('/lombaTag')
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Post."
          })
        })
    } else if (req.body.submit == 'edit') {
      const id = req.body.id;
      const lomba = req.body.lomba;
      const kategori = req.body.kategoriLomba

      Post.update({
        tag: lomba,
        kategori_lomba_id: kategori
      }, {
        where: {
          id: id
        }
      }).then((result) => {
        if (result == 1 || result == 0) {
          res.redirect('/lombaTag')
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
      const id = req.body.id;

      Post.destroy({
          where: {
            id: id
          }
        })
        .then((result) => {
          if (result == 1 || result == 0) {
            res.redirect('/lombaTag')
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