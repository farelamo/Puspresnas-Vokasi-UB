var Db = require("../../database/models");
var Post = Db.artikel;
var Op = Db.Sequelize.Op;

module.exports = {
    findAll: (req, res) => {
        var judul = req.query.judul;
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
        var id = req.params.id;

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