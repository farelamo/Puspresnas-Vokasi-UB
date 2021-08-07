const express  = require('express')
const session  = require('express-session')
const upload = require("express-fileupload");
const bodyparser = require('body-parser')
const app = express()

// SWAGGER
const swaggerUi = require('swagger-ui-express')
const apiDocumentation = require('./apidocs.json')
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(apiDocumentation))
// END SWAGGER

const db = require('./models')

//mvc
const dashboard = require('./routers/dashboard')
const user = require('./routers/user')
const bidangLomba = require('./routers/bidangLomba')
const jenisLomba = require('./routers/jenisLomba')
const editJenis = require('./routers/editJenis')
const editBidang = require('./routers/editBidang')
const lombaCat = require('./routers/lombaCat')
const lombaTag = require('./routers/lombaTag')
const lombaAll = require('./routers/lombaAll')
const bidangAll = require('./routers/bidangAll')
const profil = require('./routers/profil')
const login = require('./routers/login')
const index = require('./routers/index')
const artikel = require('./routers/artikel')
const artikelNew = require('./routers/artikelNew')
const artikelEdit = require('./routers/artikelEdit')
const berita = require('./routers/berita')
const beritaNew = require('./routers/beritaNew')
const beritaEdit = require('./routers/beritaEdit')
const kontenCat = require('./routers/kontenCat')
const kategoriKonten = require('./routers/kategoriKonten')
const kategoriLomba = require('./routers/kategoriLomba')
const tagLomba = require('./routers/tagLomba')
const tag = require('./routers/tag')
// const start = require('./routers/app')
//akhir mvc


//middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(bodyparser.urlencoded({extended: true}));
app.use(session({secret: 'excalibur'}));
app.use(upload());
app.set('view engine','ejs');
var sess;
//akhir middleware

// function isEmpty(obj) {
//     return Object.keys(obj).length === 0;
// }

// function cekSesi(obj) {
//   sess=req.session; 
//   if (sess.id_user!==undefined) {
//     console.log("+"+sess.id_user+"+")
//     res.render('admin/'+obj+'.ejs')
//   } else {
//     console.log("/"+sess.id_user+"/")
//     res.redirect('login');
//   }
// }

db.sequelize.sync();
app.use(index)
app.use(login)
app.use(profil)
app.use(dashboard)
app.use(artikel)
app.use(artikelNew)
app.use(artikelEdit)
app.use(berita)
app.use(beritaNew)
app.use(beritaEdit)
app.use(kontenCat)
app.use(jenisLomba)
app.use(bidangLomba)
app.use(bidangAll)
app.use(editJenis)
app.use(editBidang)
app.use(lombaAll)
app.use(lombaCat)
app.use(lombaTag)
app.use(user)
app.use(kategoriKonten)
app.use(kategoriLomba)
app.use(tagLomba)
app.use(tag)


app.get('/logout', (req, res) => {
  sess=req.session; 
  sess.id_user=undefined; 
  res.redirect('/login'); 
})

app.listen(3000, ()=> {
  console.log('server listening on port 3000...')
})