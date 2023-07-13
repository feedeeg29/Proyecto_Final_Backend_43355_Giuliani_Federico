import { Router } from 'express';
import productManager from '../DAOs/mongo/manager/manager.products.mongo.js';
import cartManager from '../DAOs/mongo/manager/manager.carts.mongo.js';

//instancio los managers
const viewsRoutes = Router();
const manager = new productManager();
const cManager = new cartManager();

// ruta base
viewsRoutes.get('/', (req, res) => {
    res.render('home');
});
//rutas cart
viewsRoutes.get('/carts', async (req, res) => {
    const carts = await cManager.getAllCarts();
    res.render('carts', { carts });
});


//rutas products
viewsRoutes.get('/products', async (req, res) => {
    const products = await manager.getAll();
    res.render('products', { products });
});

viewsRoutes.get('/product/:id', async (req, res) => {
    const product = await manager.getOne(req.params.id);
    res.render('product', { product });
    //console.log(product);
});

viewsRoutes.get('/addproducts', (req, res) => {
    res.render('addProduct');
});

viewsRoutes.get('/cart', async (req, res) => {
    const cart = await cManager.getOneCart(req.params.id);
    res.render('cart', { cart });
});


export default viewsRoutes