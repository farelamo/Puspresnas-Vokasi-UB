const db = require('../config/database')
var sess;

module.exports = {
  edit: (req, res) => {
    if (req.body.submit == "edit") {
      const {
        id,
        nama,
        sumber,
        tanggal,
        desk,
        tipe,
        kategoriLomba,
        tag
      } = req.body

      db.query(
        'UPDATE jenis_lomba SET nama_lomba = ?, sumber = ?, desk = ?, tipe = ?, id_kategori = ?, tanggal = ? WHERE id = ?',
        [nama, sumber, desk, tipe, kategoriLomba, tanggal, id],
        (error, edit) => {
          if (error) console.log(error)
          else {
            db.query(
              'DELETE FROM `tag` WHERE id_jenis = ?',
              [id],
              (error, hapus) => {
                if (error) console.log(error)
                else {

                if(tag.length > 1) {
                  tag.forEach((tags) => {
                    db.query(
                      'INSERT INTO `tag` (`id_jenis`,`id_tag_lomba`) VALUES (?,?)',
                      [id, tags],
                      (error, tagJenis) => {
                        if (error) console.log(error)
                      }
                    )
                  })
                } else {
                  db.query(
                    'INSERT INTO `tag` (`id_jenis`,`id_tag_lomba`) VALUES (?,?)',
                    [id, tag],
                    (error, tagJenis) => {
                      if (error) console.log(error)
                    }
                  )
                }
                  res.redirect('/lombaAll')
                }
              }
            )
          }
        }
      )
    }
  }
}