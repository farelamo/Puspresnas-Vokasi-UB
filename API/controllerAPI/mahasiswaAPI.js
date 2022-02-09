let Db = require("../../database/models");
let Post = Db.mahasiswa;
let Op = Db.Sequelize.Op;

module.exports = {
    findAll: (req, res) => {
        let judul = req.query.judul;
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
                if(data < 1){
                    res.status(204).send({
                        status: "false",
                        message: "Cant get data !!"
                    })
                }else {
                    res.status(200).send({
                        status: "true",
                        message: "Successfully get data ! !",
                        data
                    })
                }
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occured while find post"
                });
            });
    },

    findOne: (req, res) => {
        let id = req.params.id;

        Post.findByPk(id)
            .then((data) => {
                if(data < 1){
                    res.status(204).send({
                        status: "false",
                        message: "Cant get data !!"
                    })
                }else {
                    res.status(200).send({
                        status: "true",
                        message: "Successfully get data ! !",
                        data
                    })
                }
            }).catch((err) => {
                res.status(500).send({
                    message: "Error retrieving post with id=" + id
                });
            });
    }
}