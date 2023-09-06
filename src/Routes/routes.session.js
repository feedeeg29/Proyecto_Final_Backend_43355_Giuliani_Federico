import { Router } from "express";
import ActionsMongo from '../Controllers/controller.mongo.js'
import { createHash, isValidPassword } from "../utils/utils.js"
const userMongoRoutes = Router();

userMongoRoutes.get("/", async (req, res) => {
    try {
        const users = await ActionsMongo.getUsers();
        res.json({ status: 200, data: users });
    } catch (err) {
        res.json({ status: 500, err: err.message });
    }
});
userMongoRoutes.post("/register", ActionsMongo.registerUser);


// actualizar un usuario -- email requerido
userMongoRoutes.put("/:email", ActionsMongo.updateUser);

// Iniciar sesion
userMongoRoutes.post("/login", ActionsMongo.loginUser);

// Cerrar sesion
userMongoRoutes.post("/logout", ActionsMongo.logoutUser);

//Eliminar un usurio -- Email requerido
userMongoRoutes.delete("/:email", ActionsMongo.deleteUser);

// Autenticación con GitHub
userMongoRoutes.get("/github", ActionsMongo.authenticateGithub);

userMongoRoutes.get("/githubcallback", ActionsMongo.githubCallback);

// Obtener usuario actual
userMongoRoutes.get("/current", ActionsMongo.getCurrentUser);
userMongoRoutes.get('/ver-sesion', (req, res) => {
    if (req.session) {
        // Accede a los datos de la sesión
        const sessionData = req.session;

        // Imprime los datos de la sesión en la consola
        console.log(sessionData);

        // Accede a propiedades específicas de la sesión, por ejemplo, el ID del usuario
        const userId = req.session.user_id;

        // Haz lo que necesites con los datos de la sesión
        res.send('Datos de sesión vistos en la consola');
    } else {
        res.send('No hay datos de sesión disponibles');
    }
});


export default userMongoRoutes;