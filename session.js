module.exports = {
  cekSesi: function (obj) {
    sess=req.session; 
		if (sess.id_user!==undefined) {
		console.log("+"+sess.id_user+"+");
		res.render('admin/'+obj+'.ejs');
		} else {
		console.log("/"+sess.id_user+"/");
		res.redirect('login');
		}
  }
};