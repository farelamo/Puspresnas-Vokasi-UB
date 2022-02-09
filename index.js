let express  = require('express')
let session  = require('express-session')
let upload = require("express-fileupload")
let bodyparser = require('body-parser')
let flash = require("connect-flash")
let toastr = require('express-toastr')
let cookieParser = require('cookie-parser')
const axios = require("axios");
//let helmet = require('helmet')
let cors = require("cors")
let app = express()

//SWAGGER
let swaggerUi = require('swagger-ui-express')
let apiDocumentation = require('./apidocs.json')
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(apiDocumentation))

//Initialization
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
// app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
// app.use(session({secret: 'excalibur'}))
app.use(cookieParser('secret'))
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}))
app.use(toastr());
app.use(flash())
app.use(upload())
app.set('view engine','ejs')
// app.use(axios)

//Routers ADMIN
let dashboard = require('./routers/dashboard')
let user = require('./routers/user')
let bidangLomba = require('./routers/bidangLomba')
let jenisLomba = require('./routers/jenisLomba')
let editJenis = require('./routers/editJenis')
let editBidang = require('./routers/editBidang')
let lombaCat = require('./routers/lombaCat')
let lombaTag = require('./routers/lombaTag')
let lombaAll = require('./routers/lombaAll')
let bidangAll = require('./routers/bidangAll')
let profil = require('./routers/profil')
let auth = require('./routers/auth')
let index = require('./routers/index')
let artikel = require('./routers/artikel')
let artikelNew = require('./routers/artikelNew')
let artikelEdit = require('./routers/artikelEdit')
let berita = require('./routers/berita')
let beritaNew = require('./routers/beritaNew')
let beritaEdit = require('./routers/beritaEdit')
let kontenCat = require('./routers/kontenCat')
let mahasiswa = require('./routers/mahasiswa')
let mahasiswaNew = require('./routers/mahasiswaNew')
let mahasiswaEdit = require('./routers/mahasiswaEdit')
let report = require('./routers/report')

//ROUTERS API
let artikelAPI = require('./API/routersAPI/artikelAPI')
let beritaAPI = require('./API/routersAPI/beritaAPI')
let jenisLombaAPI = require('./API/routersAPI/jenisLombaAPI')
let bidangLombaAPI = require('./API/routersAPI/bidangLombaAPI')
let kategoriKontenAPI = require('./API/routersAPI/kategoriKontenAPI')
let kategoriLombaAPI = require('./API/routersAPI/kategoriLombaAPI')
let tagAPI = require('./API/routersAPI/tagAPI')
let tagLombaAPI = require('./API/routersAPI/tagLombaAPI')
let mahasiswaAPI = require('./API/routersAPI/mahasiswaAPI')
let reportAPI = require('./API/routersAPI/reportAPI')

// MIGRATE SYNC
// let db = require('./database/models')
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
app.use(user)
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
app.use(reportAPI)

//CONFIGURASI SERVER LOCAL
app.listen(8000, ()=> {
  console.log('server listening on port 8000...')
})
