const db = require('../config/database')
var sess

module.exports = {
    edit: (req, res) => {
        if (req.body.submit == "edit") {
            const {
                id,
                nama,
                hadiah,
                desk,
                biaya,
                link,
            } = req.body

            console.log(id)
            var file = req.files.berkas
            var filename = file.name
            file.mv("public/assets/bidangLomba/" + filename, ((error) => {
                if (error) console.log(error)
                db.query(
                    'UPDATE bidang_lomba SET nama_bidang = ?, desk = ?, biaya = ?, hadiah = ?, link = ?, file = ? WHERE id = ?',
                    [nama, desk, biaya, hadiah, link, filename, id],
                    (error, edit) => {
                        if (error) console.log(error)
                        else {
                            res.redirect('/lombaAll')
                        }
                    }
                )
            }))

        }
    }
}