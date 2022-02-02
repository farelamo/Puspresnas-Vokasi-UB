const db = require('../config/database')
var sess;

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