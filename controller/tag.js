const Db = require('../models')
const Post = Db.tag
const Op = Db.Sequelize.Op

module.exports = {
    findAll: (req, res) => {
        const id_jenis = req.query.id_jenis
        let condition = id_jenis ? {
            id_jenis: {
                [Op.like]: `%${id_jenis}%`
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