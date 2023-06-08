const express = require('express');

const routes = require("../Routes/routes");

const app = express()

const PORT = process.env.PORT || 8080

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', routes)
app.use((req, res, next) => {
  res.status(404).send(`
                        <h1 style="text-align: center;">
                          { error: 404, message: ruta "${req.url}" no encontrada}
                        </h1>
                        <div>
                          <img style="display: block; margin-left: auto; margin-right: auto; width: 50%;" src="https://httpstatusdogs.com/404-not-found" alt="Error 404 page not found"/>
                        </div>
                      `)
})
// Server conectado exitosamente
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// Server con error
server.on("error", (err) => {
  console.log( `El servidor a tenido un error:${err}`)
})
