var express  = require('express')
var session  = require('express-session')
var upload = require("express-fileupload")
var bodyparser = require('body-parser')
var flash = require('flash-express')
//var helmet = require('helmet')
var cors = require("cors")
var app = express()

//SWAGGER
var swaggerUi = require('swagger-ui-express')
var apiDocumentation = require('./apidocs.json')
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(apiDocumentation))

//Initialization
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(bodyparser.urlencoded({extended: true}));
app.use(session({secret: 'excalibur'}));
app.use(upload());
app.set('view engine','ejs');
app.use(flash());

//Routers ADMIN
var dashboard = require('./routers/dashboard')
var user = require('./routers/user')
var bidangLomba = require('./routers/bidangLomba')
var jenisLomba = require('./routers/jenisLomba')
var editJenis = require('./routers/editJenis')
var editBidang = require('./routers/editBidang')
var lombaCat = require('./routers/lombaCat')
var lombaTag = require('./routers/lombaTag')
var lombaAll = require('./routers/lombaAll')
var bidangAll = require('./routers/bidangAll')
var profil = require('./routers/profil')
var auth = require('./routers/auth')
var index = require('./routers/index')
var artikel = require('./routers/artikel')
var artikelNew = require('./routers/artikelNew')
var artikelEdit = require('./routers/artikelEdit')
var berita = require('./routers/berita')
var beritaNew = require('./routers/beritaNew')
var beritaEdit = require('./routers/beritaEdit')
var kontenCat = require('./routers/kontenCat')
var mahasiswa = require('./routers/mahasiswa')
var mahasiswaNew = require('./routers/mahasiswaNew')
var mahasiswaEdit = require('./routers/mahasiswaEdit')
var report = require('./routers/report')

//ROUTERS API
var artikelAPI = require('./API/routersAPI/artikelAPI')
var beritaAPI = require('./API/routersAPI/beritaAPI')
var jenisLombaAPI = require('./API/routersAPI/jenisLombaAPI')
var bidangLombaAPI = require('./API/routersAPI/bidangLombaAPI')
var kategoriKontenAPI = require('./API/routersAPI/kategoriKontenAPI')
var kategoriLombaAPI = require('./API/routersAPI/kategoriLombaAPI')
var tagAPI = require('./API/routersAPI/tagAPI')
var tagLombaAPI = require('./API/routersAPI/tagLombaAPI')
var mahasiswaAPI = require('./API/routersAPI/mahasiswaAPI')

// MIGRATE SYNC
// var db = require('./database/models')
// db.sequelize.sync();

//SECURITY APP
//app.use(helmet())

//CORS
app.use(cors())
let whiteList = [
  'http://localhost:3000',
  'http://localhost:8000'
];
let corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

//ADMIN DASHBOARD
app.use(index)
app.use(auth)
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
app.use(mahasiswa)
app.use(mahasiswaNew)
app.use(mahasiswaEdit)
app.use(report)

//API
app.use(artikelAPI)
app.use(beritaAPI)
app.use(bidangLombaAPI)
app.use(jenisLombaAPI)
app.use(kategoriKontenAPI)
app.use(kategoriLombaAPI)
app.use(tagAPI)
app.use(tagLombaAPI)
app.use(mahasiswaAPI)

//CONFIGURASI SERVER LOCAL
app.listen(8000, ()=> {
  console.log('server listening on port 8000...')
})
