<div>
<h1>Proyecto Final Backend 43355</h1>
<p> Este proyecto fue desarrollado con las siguientes librerias:</p>
    <li>
    <ul>Node.JS</ul>
    <ul>Express</ul>
    <ul>Handlebars</ul>
    <ul>Mongoose</ul>
    <ul>Nodemon</ul>
    </li>

<p> Endpoints Frontend:</p>
    <p>Vista Home</p>
    <ul>localhost:8080</ul>
    <p> Vista Products</p>
        <ul>localhost:8080/products</ul>
    <p>Vista Carts</p>
<ul>localhost:8080/carts</ul>

<h1>Endpoints Server-only</h1>
    <p>Traer todos los cart</p>
    <p>(GET)localhost:8080/cartmongo/</p>
    <h2>Traer Cart Por ID</h2>
    <p>(GET)localhost:8080/cartmongo/:id </p>
    <h2>Crear un cart nuevo</h2>
    <p>(POST)localhost:8080/cartmongo/</p>
    <h2>Agregar un producto al carrito</h2>
    <p>localhost:8080/cartmongo/:id/product/:productId</p>
    <h2>(PUT)Actualizar un carrito</h2>
    <p>localhost:8080/cartmongo/:id</p>
    <h2>Eliminar un carrito</h2>
    <p><b style="color:red">(DELETE)</b>localhost:8080/cartmongo/:id</p>