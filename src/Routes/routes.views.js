import { Router } from 'express';
import ActionsMongo from '../Controllers/controller.mongo.js';

const viewsRoutes = Router();

// Ruta base
viewsRoutes.get('/', (req, res) => {
    res.render('home');
});

// Rutas de productos
viewsRoutes.get('/products', ActionsMongo.getAll);
viewsRoutes.get('/product/:id', ActionsMongo.getOne);
viewsRoutes.get('/addproducts', (req, res) => {
    res.render('addProduct');
});

// Rutas de carritos
viewsRoutes.get('/carts', ActionsMongo.getAllCarts);
viewsRoutes.get('/cart/:id', ActionsMongo.getOneCart);

// Rutas de autenticación
viewsRoutes.get('/login', (req, res) => {
    res.render('login');
});
viewsRoutes.get('/register', (req, res) => {
    res.render('register');
});
viewsRoutes.get('/profile', (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
});




/*
//instancio los managers
const viewsRoutes = Router();


// ruta base
viewsRoutes.get('/', (req, res) => {
    res.render('home');
});


//rutas cart

//Ruta para renderizar todos los cart
viewsRoutes.get('/carts', async (req, res) => {
    const { carts, hasNextPage, hasPrevPage, nextPage, prevPage } = await ActionsMongo.getAllCarts(req, res, req.query);
    res.render('carts', { carts, hasNextPage, hasPrevPage, nextPage, prevPage });
});
//Ruta para renderizar un cart -- ID requerido
viewsRoutes.get('/cart', async (req, res) => {
    const cart = await ActionsMongo.getOneCart(req.params.id);
    res.render('cart', { cart });
});

//Rutas products

//Ruta para renderizar todos los productos
viewsRoutes.get('/products', async (req, res) => {
    const { products, hasNextPage, hasPrevPage, nextPage, prevPage } = await ActionsMongo.getAll(req, res, req.query);
    res.render('products', { products, hasNextPage, hasPrevPage, nextPage, prevPage });
});

//Ruta para renderizar un producto -- ID requerido
viewsRoutes.get('/product/:id', async (req, res) => {
    const product = await ActionsMongo.getOne(req.params.id);
    res.render('product', { product });
});

//Ruta para renderizar el formulario de creacion de productos
viewsRoutes.get('/addproducts', (req, res) => {
    res.render('addProduct');
});

//rutas de login y register
viewsRoutes.get('/login', (req, res) => {
    res.render('login');
});
viewsRoutes.get('/register', (req, res) => {
    res.render('register');
});
viewsRoutes.get('/profile', (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
});

*/

export default viewsRoutes