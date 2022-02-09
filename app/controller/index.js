let db = require('../config/database')
let sess;

module.exports = {
    index: (req, res) => {
        sess = req.session;
        if (sess.id_user == undefined) {
            res.redirect('/login')
        } else {
            res.redirect('/dashboard')
        }
    }
}