const Db = require("../../database/models");
const Post = Db.bidangLomba;
const Op = Db.Sequelize.Op;

module.exports = {
    findAll: (req, res) => {
        const judul = req.query.judul;
        let condition = judul ? {
            judul: {
                [Op.like]: `%${judul}%`
            }
        } : null;

        Post.findAll({
                order: [
                    ['id', 'DESC']
                ],
                where: condition
            })
            .then((data) => {
                res.send(data)
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occured while find post"
                });
            });
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