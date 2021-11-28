const express  = require('express')
const session  = require('express-session')
const upload = require("express-fileupload");
const bodyparser = require('body-parser')
//const helmet = require('helmet')
// const cors = require("cors");
const app = express()

//SWAGGER
const swaggerUi = require('swagger-ui-express')
const apiDocumentation = require('./apidocs.json')
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(apiDocumentation))
//END SWAGGER

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(bodyparser.urlencoded({extended: true}));
app.use(session({secret: 'excalibur'}));
app.use(upload());
app.set('view engine','ejs');
var sess;
//END Middleware

//Routers ADMIN
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
const mahasiswa = require('./routers/mahasiswa')
const mahasiswaNew = require('./routers/mahasiswaNew')
const mahasiswaEdit = require('./routers/mahasiswaEdit')
//END ROUTERS ADMIN

//ROUTERS API
const artikelAPI = require('./API/routersAPI/artikelAPI')
const beritaAPI = require('./API/routersAPI/beritaAPI')
const jenisLombaAPI = require('./API/routersAPI/jenisLombaAPI')
const bidangLombaAPI = require('./API/routersAPI/bidangLombaAPI')
const kategoriKontenAPI = require('./API/routersAPI/kategoriKontenAPI')
const kategoriLombaAPI = require('./API/routersAPI/kategoriLombaAPI')
const tagAPI = require('./API/routersAPI/tagAPI')
const tagLombaAPI = require('./API/routersAPI/tagLombaAPI')
const mahasiswaAPI = require('./API/routersAPI/mahasiswaAPI')
//END ROUTERS API

//PERSAMAAN MIGRATE
//const db = require('./models')
// db.sequelize.sync();

//SECURITY APP
//app.use(helmet())

//CORS
// let whiteList = [
//   'http://localhost:3000',
//   'http://localhost:8000',
//   'https://front-end-simapres.vercel.app/prestasi'
    
// ];
// let corsOptions = {
//     origin: function (origin, callback) {
//         if (whiteList.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// };

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

// app.use(cors(corsOptions));

//END CORS

//ADMIN DASHBOARD
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
app.use(mahasiswa)
app.use(mahasiswaNew)
app.use(mahasiswaEdit)
//END ADMIN DASHBOARD

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
//END API

app.get('/logout', (req, res) => {
  sess=req.session; 
  sess.id_user=undefined; 
  res.redirect('/login'); 
})

//CONFIGURASI SERVER LOCAL
app.listen(3000, ()=> {
  console.log('server listening on port 3000...')
})
