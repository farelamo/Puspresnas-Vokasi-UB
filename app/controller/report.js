var db = require('../config/database')
var sess

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
            res.render('admin/index', {profil,page:"report"});
          }
        }
      );
    }
  }
}