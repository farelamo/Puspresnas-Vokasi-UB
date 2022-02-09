let Db = require('../../database/models')
let Post = Db.tagLomba
let Op = Db.Sequelize.Op
let PostCat = Db.kategoriLomba

module.exports = {
    findAll: (req, res) => {
        let tag = req.query.tag
        let condition = tag ? {
            tag: {
                [Op.like]: `%${tag}%`
            }
        } : null

        Post.findAll({
            include: [{
                model: PostCat,
                required: false,
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