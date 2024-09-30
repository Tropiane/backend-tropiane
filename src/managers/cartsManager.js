import Cart from "../models/cart.model.js";
import Products from "../models/products.model.js";

class CartsManager {
    constructor() {
        this.carts = [];
    }

    async createCart() {
        try {
            const newCart = new Cart({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error("Error al crear el carrito: " + error.message);
        }
    }

    async addProductToCart(cid, pid, quantity) {
        try {
            const cart = await Cart.findById(cid);
            if (!cart) throw new Error("Carrito no encontrado");

            const product = await Products.findById(pid);
            if (!product) throw new Error("Producto no encontrado");

            const existingProductIndex = cart.products.findIndex(p => p.product.toString() === pid);
            if (existingProductIndex !== -1) {

                cart.products[existingProductIndex].quantity += quantity;
            } else {

                cart.products.push({ product: pid, quantity });
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error("Error al agregar producto al carrito: " + error.message);
        }
    }

    async getCartById(cid) {
        try {
            return await Cart.findById(cid).populate('products.product');
        } catch (error) {
            throw new Error("Error al obtener carrito: " + error.message);
        }
    }

    async updateProductQuantity(cid, pid, quantity) {
        try {
            const cart = await Cart.findById(cid);
            if (!cart) throw new Error("Carrito no encontrado");

            const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
            if (productIndex === -1) throw new Error("Producto no encontrado en el carrito");

            cart.products[productIndex].quantity = quantity;
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error("Error al actualizar la cantidad del producto: " + error.message);
        }
    }

    async removeProductFromCart(cid, pid) {
        try {
            const cart = await Cart.findById(cid);
            if (!cart) throw new Error("Carrito no encontrado");

            cart.products = cart.products.filter(p => p.product.toString() !== pid);
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error("Error al eliminar producto del carrito: " + error.message);
        }
    }

    async clearCart(cid) {
        try {
            const cart = await Cart.findById(cid);
            if (!cart) throw new Error("Carrito no encontrado");

            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error("Error al vaciar el carrito: " + error.message);
        }
    }
}

const cartsManager = new CartsManager();
export default cartsManager;
