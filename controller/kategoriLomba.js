const Db = require('../models')
const Post = Db.kategoriLomba
const Op = Db.Sequelize.Op

module.exports = {
    findAll: (req, res) => {
        const kategori = req.query.kategori
        let condition = kategori ? {
            kategori: {
                [Op.like]: `%${kategori}%`
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