const db = require('../config/database')
var sess;

module.exports = {
    index: (req, res) => {
        sess=req.session; 
        if (sess.id_user==undefined) { res.redirect('/login'); } 
        else {  
          db.query(
            'SELECT * FROM `user` WHERE `id_user`=(?)',
            [sess.id_user],
            (err,profil) => {
              if(err) console.log(err)
              else {
                var page = req.url.split ('/') [1]; 
                /* 
                  ('/') = untuk mendapatkan nama page dari url yang dipencet (dri router)   
                   [1] buat nentuin index mana yang diambil,
                   ex, localhost:3000/dashboard 
                   ('/') = [0]
                   ('/dashboard) = [1]
                */
              res.render('admin/index',{profil, page});
              }
            }
          );
        }
      }
}