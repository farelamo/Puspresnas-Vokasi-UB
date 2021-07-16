const db = require('../config/database')
const CryptoJS = require("crypto-js");

var sess;

module.exports = {
   login: (req, res) => {
        // console.log("-"+sess.id_user+"-");
        res.render('../views/admin/page/login.ejs');
    },

    post: (req, res) => {
        if (req.body.submit=="login") {
          console.log(req.body.submit);
          var username = req.body.username;
          var password = CryptoJS.MD5(req.body.password).toString();
          db.query(
            'SELECT * FROM `user` WHERE `username`=(?) AND `password`=(?)',
            [username,password],
            (error,results) => {
              var numRows = results.length;
              console.log(numRows);
              if (numRows==1) { 
                sess=req.session; 
                sess.id_user=results[0].id_user; 
                res.redirect('/dashboard')
              }
              else {res.redirect('/login')
              }
            }
          );
        } else {
          res.redirect('/login');
        }
      }
}