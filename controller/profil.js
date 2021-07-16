const db = require('../config/database')
var sess;

module.exports = {
    index: (req, res) => {
        sess=req.session; 
        if (sess.id_user==undefined) { res.redirect('login'); } 
        else {  
          db.query(
            'SELECT * FROM `user` WHERE `id_user`=(?)',
            [sess.id_user],
            (error,profil) => {
              res.render('../views/admin/index.ejs',{profil, page : 'profil'});
            }
          );
        }
      }
}