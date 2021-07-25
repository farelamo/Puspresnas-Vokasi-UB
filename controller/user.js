const db = require('../config/database')
var sess;

module.exports = {
  index: (req, res) => {
    sess = req.session;
    if (sess.id_user == undefined) {
      res.redirect('login');
    } else {
      db.query(
        'SELECT * FROM `user` WHERE `id`=(?)',
        [sess.id_user],
        (error, profil) => {
          db.query(
            'SELECT * FROM `user`',
            [sess.id_user],
            (error, user) => {
              res.render('../views/admin/index.ejs', {
                profil,
                user,
                page: 'user'
              });
            }
          );
        }
      );
    }
  }
}