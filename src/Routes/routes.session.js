import { Router } from "express";
import ActionsMongo from '../Controllers/controller.mongo.js'
import passport from "passport";
import { createHash, isValidPassword } from "../utils/utils.js"
import { arch } from "os";
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


export default userMongoRoutes;