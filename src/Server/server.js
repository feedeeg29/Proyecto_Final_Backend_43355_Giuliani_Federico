import express from 'express';
import mongoose from 'mongoose';
import fsroutes from "../Routes/routes.fs.js";
import mnroutes from "../Routes/routes.mongo.js"
import viewsRoutes from "../Routes/routes.views.js"
import handlebars from 'express-handlebars'
import __dirname from '../utils/utils.js'
import path from 'path'
import cartMongoRoutes from '../Routes/cart.mongo.routes.js'

const app = express()

const PORT = process.env.PORT || 8080


const connection = await mongoose.connect('mongodb+srv://giulianifederic0:fede43355@backend43355.w4nu7mi.mongodb.net/?retryWrites=true&w=majority')

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//handlebars config

app.engine("handlebars", handlebars.engine({ defaultLayout: 'home', extname: '.handlebars' }))
app.use(express.static(`${__dirname}/public`))
app.set("view engine", "handlebars")
app.set('views', path.join(__dirname, '..', 'views'));


//rutas para el front
app.use('/', viewsRoutes)
app.use('/products', viewsRoutes)
app.use('/addproducts', viewsRoutes)
app.use('/carts', viewsRoutes)
app.use('/products/product/:id', viewsRoutes)
app.use('/apifs', fsroutes)
app.use('/apimongo', mnroutes)
app.use('/cartmongo', cartMongoRoutes)
app.use((req, res, next) => {
  /* solo descomentar este codigo durante las pruebas
  const youtubeURL = "https://youtu.be/7aMOurgDB-o?t=60"
  res.redirect(youtubeURL)*/
  res.status(404).send(`
                        <h1 style="text-align: center;">
                          error: 404, message: ruta "${req.url}" no encontrada
                        </h1>
                        <div>
                          <img style="display: block; margin-left: auto; margin-right: auto; width: 50%;" src="../public/errors/404.jpg" alt="Error 404 page not found"/>
                        </div>
                      `)
})
// Server conectado exitosamente
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// Server con error
server.on("error", (err) => {
  console.log(`El servidor a tenido un error:${err}`)
})
