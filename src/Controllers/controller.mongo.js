import ProductManager from '../DAOs/mongo/manager/manager.products.mongo.js';
import CartManager from '../DAOs/mongo/manager/manager.carts.mongo.js';
import UserManager from '../DAOs/mongo/manager/manager.user.mongo.js';
import passport from "passport";
import { createHash, isValidPassword } from "../utils/utils.js"

class ActionsMongo {
    // Métodos de productos
    static async getAll(req, res) {
        try {
            const { products, hasNextPage, hasPrevPage, nextPage, prevPage } = await ProductManager.getAll(req, res, req.query);
            res.render('products', { products, hasNextPage, hasPrevPage, nextPage, prevPage });
        } catch (err) {
            res.json({ status: 500, err: err.message });
        }
    }

    static async getOne(req, res) {
        try {
            const product = await ProductManager.getOne(req.params.id);
            res.render('product', { product });
        } catch (err) {
            res.json({ status: 500, err: err.message });
        }
    }

    // Métodos de carritos
    static async getAllCarts(req, res) {
        try {
            const { carts, hasNextPage, hasPrevPage, nextPage, prevPage } = await CartManager.getAllCarts(req, res, req.query);
            res.render('carts', { carts, hasNextPage, hasPrevPage, nextPage, prevPage });
        } catch (err) {
            res.json({ status: 500, err: err.message });
        }
    }

    static async getOneCart(req, res) {
        try {
            const cart = await CartManager.getOneCart(req.params.id);
            res.render('cart', { cart });
        } catch (err) {
            res.json({ status: 500, err: err.message });
        }
    }



    // Métodos de autenticación (manejo de usuarios)
    static async registerUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserManager.createUser({ email, password });
            res.json({ status: 'success', payload: user });
        } catch (err) {
            res.json({ status: 500, err: err.message });
        }
    }

    static async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await UserManager.getUserByEmailAndPassword(email, password);

            if (!user) {
                return res.status(400).send({ status: "error", error: "Credenciales inválidas" });
            }

            // Validación de contraseña aquí, puedes usar UserManager para esto

            if (req.session) {
                req.session.user = {
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    role: user.role,
                };
            } else {
                console.log("Error en la sesión");
            }

            res.status(200).send({ status: "success", message: "Inicio de sesión exitoso" });
        } catch (err) {
            res.status(500).send({ status: "error", error: err.message });
        }
    }

    static async logoutUser(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    res.json({ status: 500, err: err.message });
                } else {
                    res.sendStatus(200);
                }
            });
        } catch (err) {
            res.json({ status: 500, err: err.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const email = req.params.email;
            const userData = req.body;
            const updatedUser = await UserManager.updateUserByEmail(email, userData);
            res.json({ status: 200, data: updatedUser });
        } catch (err) {
            res.json({ status: 500, err: err.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const email = req.params.email;
            const deletedUser = await UserManager.deleteUser(email);
            res.json({ status: 200, data: deletedUser });
        } catch (err) {
            res.json({ status: 500, err: err.message });
        }
    }
    static async authenticateGithub(req, res, next) {
        passport.authenticate("github")(req, res, next);
    }

    static async githubCallback(req, res, next) {
        passport.authenticate("github", async (err, user) => {
            if (err) {
                // Manejar el error aquí
                return res.status(500).json({ status: "error", message: "Error en autenticación de GitHub" });
            }

            req.session.user = user;
            res.redirect("/");
        })(req, res, next);
    }

    static async getCurrentUser(req, res) {
        if (req.isAuthenticated()) {
            const currentUser = req.user;
            res.status(200).json({ status: "success", user: currentUser });
        } else {
            res.status(401).json({ status: "error", message: "Usuario no autenticado" });
        }
    }
}





export default ActionsMongo;
