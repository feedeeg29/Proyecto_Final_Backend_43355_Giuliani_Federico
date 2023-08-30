import cartModel from "../models/model.carts.mongo.js";


class cartManager {
    static getAllCarts = async (req, res, query) => {
        try {
            const options = {
                page: req.query.page || 1,
                limit: req.query.limit || 10,
                lean: true
            };

            const datosCart = await cartModel.paginate({}, options);
            const carts = datosCart.docs;
            const hasPrevPage = datosCart.hasPrevPage;
            const hasNextPage = datosCart.hasNextPage;
            const prevPage = datosCart.prevPage;
            const nextPage = datosCart.nextPage;
            return { carts, hasNextPage, hasPrevPage, nextPage, prevPage };
        } catch (err) {
            throw new Error(err);
        }
    }
    static getOneCart = async (id) => {
        try {
            return await cartModel.findById(id).populate('items.productId').lean();
        } catch (err) {
            throw new Error(err);
        }
    }
    static createCart = async (cart) => {
        try {
            const newCart = new cartModel(cart);
            return await newCart.save();
        } catch (err) {
            throw new Error(err);
        }
    }
    // Función para agregar un producto al carrito


    static addToCart = async (cartId, productId) => {
        try {
            const cart = await cartModel.findById(cartId);

            const existingItem = cart.items.find(item => item.productId.toString() === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }
            await cart.save();

            console.log('Producto agregado al carrito');
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    }

    // Función para remover un producto del carrito
    static removeFromCart = async (cartId, productId) => {
        try {
            const cart = await cartModel.findById(cartId);
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex !== -1) {
                cart.items.splice(itemIndex, 1);

                await cart.save();

                console.log('Producto removido del carrito');
            } else {
                console.log('El producto no existe en el carrito');
            }
        } catch (error) {
            console.error('Error al remover producto del carrito:', error);
        }
    }
    static updateCart = async (id, cart) => {
        try {
            return await cartModel.findByIdAndUpdate(id, cart, { new: true });
        } catch (err) {
            throw new Error(err);
        }
    }

    // Función para vaciar el carrito
    static clearCart = async (cartId) => {
        try {

            const cart = await cartModel.findById(cartId);
            cart.items = [];
            await cart.save();

            console.log('Carrito vaciado');
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
        }
    }
    static deleteCart = async (id) => {
        try {
            return await cartModel.findByIdAndDelete(id);
        } catch (err) {
            throw new Error(err);
        }
    }
}
export default cartManager

