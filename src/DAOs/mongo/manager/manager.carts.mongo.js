import cartModel from "../models/model.carts.mongo.js";
import productModel from "../models/model.products.mongo.js";

class cartManager {
    getAllCarts = async () => {
        try {
            return await cartModel.find().populate('items.productId').lean();
        } catch (err) {
            throw new Error(err);
        }
    }
    getOneCart = async (id) => {
        try {
            return await cartModel.findById(id).populate('items.productId').lean();
        } catch (err) {
            throw new Error(err);
        }
    }
    createCart = async (cart) => {
        try {
            const newCart = new cartModel(cart);
            return await newCart.save();
        } catch (err) {
            throw new Error(err);
        }
    }
    // Función para agregar un producto al carrito


    addToCart = async (cartId, productId) => {
        try {
            const cart = await cartModel.findById(cartId);
            console.log

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
    removeFromCart = async (cartId, productId) => {
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

    // Función para vaciar el carrito
    clearCart = async (cartId) => {
        try {

            const cart = await cartModel.findById(cartId);
            cart.items = [];
            await cart.save();

            console.log('Carrito vaciado');
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
        }
    }
    deleteCart = async (id) => {
        try {
            return await cartModel.findByIdAndDelete(id);
        } catch (err) {
            throw new Error(err);
        }
    }
}
export default cartManager

