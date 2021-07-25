const db = require('../config/database')
var sess;

module.exports = {
  index: (req, res) => {
    sess = req.session;
    if (sess.id_user == undefined) {
      res.redirect('/login');
    } else {
      db.query(
        'SELECT * FROM `user` WHERE `id`=(?)',
        [sess.id_user],
        (err, profil) => {
          if (err) console.log(err)
          else {
            var page = req.url.split('/')[1];
            /* 
              ('/') = untuk mendapatkan nama page dari url yang dipencet (dri router)   
               [1] buat nentuin index mana yang diambil,
               ex, localhost:3000/dashboard 
               ('/') = [0]
               ('/dashboard) = [1]
            */
            db.query(
              'SELECT * FROM berita',
              (err, berita) => {
                db.query(
                  'SELECT * FROM artikel',
                  (err, artikel) => {
                    db.query(
                      'SELECT * FROM kategori_konten',
                      (err, kategori_konten) => {
                        db.query(
                          'SELECT * FROM jenis_lomba',
                          (err, jenis_lomba) => {
                            db.query(
                              'SELECT * FROM bidang_lomba',
                              (err, bidang_lomba) => {
                                db.query(
                                  'SELECT * FROM kategori_lomba',
                                  (err, kategori_lomba) => {
                                    db.query(
                                      'SELECT * FROM tag_lomba',
                                      (err, tag_lomba) => {
                                        res.render('admin/index', {
                                          profil,
                                          page,
                                          berita,
                                          artikel,
                                          kategori_konten,
                                          jenis_lomba,
                                          bidang_lomba,
                                          kategori_lomba,
                                          tag_lomba
                                        });
                                      }
                                    )
                                  }
                                )
                              }
                            )
                          }
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        }
      );
    }
  }
}