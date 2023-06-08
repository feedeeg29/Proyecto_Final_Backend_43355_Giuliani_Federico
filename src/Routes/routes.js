const express = require("express");
const { Router } = express;
const router = Router();
const Actions = require("../Controllers/controller");
const admin = true;

// return a product by id
router.get("/api/productos/:id", (req, res) => {
    const { id } = req.params;
    Actions.getOne(id)
        .then(product => {
            res.status(200).json(product);
        }).catch(err => {
            console.error(err)
        })
});
// return all products
router.get("/api/productos", (req, res) => {
    Actions.getAll().then(data => {
        res.status(200).send(data)
    }).catch(err => {
        console.log(err)
    })
})

// add a new product
router.post("/api/productos", (req, res) => {
    res.send(admin ? Actions.add(req.body) : { error: 403, description: 'método POST en ruta /productos solo disponible para administradores' });
});

// update a product
router.put("/api/productos/:id", (req, res) => {
    const { id } = req.params
    const body = req.body
    res.send(admin ? Actions.update(id, body) : { error: 403, description: 'método PUT en ruta /productos solo disponible para administradores' });
});

// delete a product
router.delete("/api/productos/:id", (req, res) => {
    res.send(admin ? Actions.delete(req.params.id) : { error: 403, description: `<div><h1>Error 403</h1><h2> Forbidden<h2></div>` });
})

// create a new cart and return the id
router.post("/api/carrito/", (req, res) => {
    const prods = req.body;
    res.send(Actions.createCart(prods));
})

// delete a cart by id
router.delete("/api/carrito/:id", (req, res) => {
    res.send(Actions.deleteCart(req.params.id));
})

// get all products of a cart by id
router.get("/api/carrito/:id/productos", (req, res) => {
    Actions.getCartProducts(req.params.id)
        .then(data => { res.status(200).send(data) }).catch(err => { console.log(err) })
})

// add a product to a cart by id
router.post("/api/carrito/:id/productos", (req, res) => {
    const { id } = req.params;
    const productId = req.body.id;
    res.send(Actions.addToCart(id, productId));
})

// delete a product from a cart by id
router.delete("/api/carrito/:id/productos/:id_prod", (req, res) => {
    const { id, id_prod } = req.params;
    res.send(Actions.deleteFromCart(id, id_prod));
})

module.exports = router;