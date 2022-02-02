const Db = require('../../database/models')
const Post = Db.tagLomba
const Op = Db.Sequelize.Op
const PostCat = Db.kategoriLomba

module.exports = {
    findAll: (req, res) => {
        const tag = req.query.tag
        let condition = tag ? {
            tag: {
                [Op.like]: `%${tag}%`
            }
        } : null

        Post.findAll({
            include: [{
                model: PostCat,
                required: true,
              }],
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