let db = require('../config/database')
let sess

module.exports = {

    index: (req, res) => {
        sess = req.session;
        if (sess.id_user == undefined) {
            res.redirect('login');
        } else {
            db.query(
                'SELECT * FROM `user` WHERE `id`= ?',
                [sess.id_user],
                (error, profil) => {
                    if (error) console.log(error)
                    else {
                        db.query(
                            'SELECT * FROM bidang_lomba WHERE id = ?',
                            [req.params.id],
                            (error, bidang) => {
                                if (error) console.log(error)
                                else {
                                    let idJenis = req.params.id
                                    console.log(idJenis)
                                    res.render('../views/admin/index.ejs', {
                                        profil,
                                        bidang,
                                        idJenis,
                                        page: 'editBidang'
                                    })
                                }
                            })
                    }
                })
        }
    },

    edit: (req, res) => {
        if (req.body.submit == "edit") {
            let {
                nama,
                hadiah,
                desk,
                biaya,
                link
            } = req.body

            if (req.body.berkas == null && req.body.gambar == null) {
                db.query(
                    'UPDATE bidang_lomba SET nama_bidang = ?, desk = ?, biaya = ?, hadiah = ?, link = ?, file = ? WHERE id = ?',
                    [nama, desk, biaya, hadiah, link, filename, req.params.id],
                    (error, edit) => {
                        if (error) console.log(error)
                        else {
                            db.query(
                                "SELECT `id`, `jenis_lomba_id` FROM `bidang_lomba` WHERE `id` = ?",
                                [req.params.id],
                                (error, sesuai) => {
                                    if (error) console.log(error)
                                    else {
                                        console.log(sesuai[0].jenis_lomba_id)
                                        if (req.params.id == sesuai[0].id) {
                                            res.redirect('/bidangAll/' + sesuai[0].jenis_lomba_id)
                                        }
                                    }
                                }
                            )
                        }
                    }
                )
            } else {
                let file = req.files.berkas
                let filename = req.params.id + '.pdf'
                file.mv("public/assets/bidangLomba/" + filename, ((error) => {
                    if (error) console.log(error)
                    db.query(
                        'UPDATE bidang_lomba SET nama_bidang = ?, desk = ?, biaya = ?, hadiah = ?, link = ?, file = ? WHERE id = ?',
                        [nama, desk, biaya, hadiah, link, filename, req.params.id],
                        (error, edit) => {
                            if (error) console.log(error)
                            else {
                                let gambar = req.files.gambar
                                let namaGambar = req.params.id + '.png'
                                gambar.mv("public/assets/img/bidangLomba/" + namaGambar, ((error) => {
                                    if (error) console.log(error)
                                    db.query(
                                        'UPDATE bidang_lomba SET gambar = ? WHERE id = ?',
                                        [namaGambar, req.params.id],
                                        (error, hasil) => {
                                            if (error) console.log(error)
                                            else {
                                                db.query(
                                                    "SELECT `id`, `jenis_id` FROM `bidang_lomba` WHERE `id` = ?",
                                                    [req.params.id],
                                                    (error, sesuai) => {
                                                        if (error) console.log(error)
                                                        else {
                                                            console.log(sesuai[0].jenis_lomba_id)
                                                            if (req.params.id == sesuai[0].id) {
                                                                res.redirect('/bidangAll/' + sesuai[0].jenis_lomba_id)
                                                            }
                                                        }
                                                    }
                                                )
                                            }
                                        }
                                    )
                                }))
                            }
                        }
                    )
                }))
            }
        }
    }
}