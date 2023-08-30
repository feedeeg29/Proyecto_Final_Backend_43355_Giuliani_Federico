import express from 'express';
import fsroutes from "../Routes/routes.fs.js";
import mnroutes from "../Routes/routes.mongo.js"
import viewsRoutes from "../Routes/routes.views.js"
import handlebars from 'express-handlebars'
import __dirname from '../utils/utils.js'
import path from 'path'
import cartMongoRoutes from '../Routes/cart.mongo.routes.js'
import userMongoRoutes from '../Routes/routes.session.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from '../utils/Passport/passport.config.js';
import { URI } from '../db/mongo.db.js';
import { secret, PORT } from '../utils/dotenv/dotenv.config.js'
import { connectToDatabase } from '../db/mongo.db.js';
const app = express()





//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
connectToDatabase()
app.use(session({
  store: new MongoStore({
    mongoUrl: URI,
    ttl: 7200,
  }),
  secret: secret,
  resave: false,
  saveUninitialized: false
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());


//handlebars config

app.engine("handlebars", handlebars.engine({ defaultLayout: 'home', extname: '.handlebars' }))
app.use(express.static(`${__dirname}/public`))
app.use(express.static(`${__dirname}/public`))
app.use(express.static(`public/errors`))
app.set("view engine", "handlebars")
app.set('views', path.join(__dirname, '..', 'views'));


//rutas para el front
app.use('/', viewsRoutes)
app.use('/products', viewsRoutes)
app.use('/addproducts', viewsRoutes)
app.use('/carts', viewsRoutes)
app.use('/products/product/:id', viewsRoutes)
app.use('/login', viewsRoutes)
app.use('/register', viewsRoutes)
app.use('/profile', viewsRoutes)

//rutas backend-only
app.use('/apifs', fsroutes)
app.use('/apimongo', mnroutes)
app.use('/cartmongo', cartMongoRoutes)
app.use('/mongouser', userMongoRoutes)

app.use((req, res, next) => {
  /* solo descomentar este codigo durante las pruebas
  const youtubeURL = "https://youtu.be/7aMOurgDB-o?t=60"
  res.redirect(youtubeURL)*/
  res.status(404).render("404")
})
// Server conectado exitosamente
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// Server con error
server.on("error", (err) => {
  console.log(`El servidor a tenido un error:${err}`)
})
