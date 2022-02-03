var db = require('../config/database')
var Db = require('../../database/models')
var users = Db.user
var bcrypt = require('bcrypt')
var sess;

module.exports = {
    login: (req, res) => {
        res.render('../views/admin/page/login.ejs');
    },

    post: async (req, res) => {
        await users.findOne(
          {where : {username: req.body.username}}
        ).then((result) => {
          if(result == null){
            return res.redirect('login')
          }
          var match = bcrypt.compareSync(req.body.password, result.password)
          console.log(match)
          if(match){
            if(result.is_active == 1){
              sess=req.session; 
              sess.id_user=result.id; 
              res.redirect('/dashboard')
            }else {
              console.log('akun belum di ACC !!')
              res.redirect('/login')
            }
          }else {
            console.log('password salah !!')
            res.redirect('/login')
          }
        })
    },

    daftar: (req, res) => {
        res.render('../views/admin/page/register.ejs');
    },

    register: (req, res) => {
      var {name,username,password} = req.body
      db.query('SELECT username FROM user WHERE username = ?',
      [username],
      async (error, result) => {
        if (error) {
          console.log(error)
        }else { //message belum di display
          if (result.length > 0) {
            return res.render('../views/admin/page/register.ejs', {
              pesan: "Email sudah pernah terdaftar !!"
            })
          }else {
            let hashedPassword = await bcrypt.hash(password, 8)
            console.log(hashedPassword)
            db.query('INSERT INTO user SET ?', 
              {
                nama: name,
                username: username,
                password: hashedPassword,
                level: 'Admin',
                foto: '',
                is_active: 0
              },
            (err, result) => {
            if (err) {
              console.log(error)
            } else {
              console.log(result)
              return res.redirect('/login')
            }})
          }
        }
      })
    },

    logout: (req, res) => {
      sess=req.session; 
      sess.id_user=undefined; 
      console.log('logout success !!')
      res.redirect('/login');
    },
}