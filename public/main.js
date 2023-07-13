

/*// Escuchar evento 'updateProducts' y actualizar la lista de productos
socket.on('updateProducts', (products) => {
    // Actualizar la lista en la vista home
    if (window.location.pathname === '/') {
        updateProductList(products);
    }
    // Actualizar la lista en la vista realTimeProducts
    if (window.location.pathname === '/realtimeproducts') {
        updateProductList(products);
    }
});

// Función para actualizar la lista de productos en la vista
function updateProductList(products) {
    const productList = document.querySelector('#product-list');
    productList.innerHTML = '';

    for (const product of products) {
        const listItem = document.createElement('li');
        listItem.textContent = product.title;
        productList.appendChild(listItem);
    }
}

function removeProduct(productId) {
    fetch(`/products/${productId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log('Producto eliminado');
            }
        })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
        });
}
*/
// Importa el CartManager si es necesario

// Obtén una referencia al botón
const addProductButton = document.getElementById('addProductButton');

addProductButton.addEventListener('click', () => {
    const productId = addProductButton.dataset.productId;

    fetch(`/apimongo/${productId}`)
        .then(response => response.json())
        .then(data => {
            fetch(`/cartmongo/64af8f67aaf957168dee2c8f/product/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
});

// Agrega un evento de clic al botón
/*addProductButton.addEventListener('click', () => {
    // Obtén el ID del producto (puedes obtenerlo del DOM o pasarlo como parámetro)
    const productId = addProductButton.dataset.productId;;
    if (productId) {
        console.log(productId)
    }
    else {
        console.log('no hay id')
    }
    console.log('Producto agregado al carrito:', cart);
});*/
