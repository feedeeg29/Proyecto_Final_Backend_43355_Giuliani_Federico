import { Router } from 'express';
import cartManager from '../DAOs/mongo/manager/manager.carts.mongo.js';


const cartMongoRoutes = Router();
const manager = new cartManager();

cartMongoRoutes.get('/', async (req, res) => {
    try {
        const carts = await manager.getAllCarts()
        console.log(...carts)
        res.json({ status: 200, data: carts })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
cartMongoRoutes.get('/:id', async (req, res) => {
    try {
        const cart = await manager.getOneCart(req.params.id)
        console.log(cart)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
cartMongoRoutes.post('/', async (req, res) => {
    try {
        const cart = await manager.createCart(req.body)
        console.log(cart)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
cartMongoRoutes.post('/:id/product/:productId', async (req, res) => {
    try {
        const cart = await manager.addToCart(req.params.id, req.params.productId)

        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
cartMongoRoutes.put('/:id', async (req, res) => {
    try {
        const cart = await manager.updateCart(req.params.id, req.body)
        console.log(cart)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
cartMongoRoutes.delete('/:id', async (req, res) => {
    try {
        const cart = await manager.deleteCart(req.params.id)
        console.log(cart)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
cartMongoRoutes.delete('/:id/product/:productId', async (req, res) => {
    try {
        const cart = await manager.removeFromCart(req.params.id, req.params.productId)
        console.log(cart)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})


export default cartMongoRoutes