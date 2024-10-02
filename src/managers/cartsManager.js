import Cart from "../models/cart.model.js";

class CartsManager{

    constructor(){
        this.carts = [];
        
    }

    async createCart(){
        
        const newCart = await Cart.create({products: []});
        console.log("Cart ID created " + newCart._id);
        
        return newCart._id;
    }

    async getCart(cart){
        let cartDB = await Cart.findById(cart).populate("products.product");
        
        return cartDB.products;
    }

    async getTotal(cart){
        let cartDB = await Cart.findById(cart).populate("products.product");
        let totalPrice = 0;
        cartDB.products.forEach((product) => {
            totalPrice += product.product.price;
        });
        return totalPrice;
    }

    async addProductToCart(cart, product, quantity) {
        try {
            const cartDB = await Cart.findById(cart);
            if (!cartDB) {
                throw new Error("Cart not found");
            }
            const findProduct = cartDB.products.findIndex((p) => p.product._id.toString() === product);
            if (findProduct === -1) {
                cartDB.products.push({ product, quantity });
            } else {
                cartDB.products[findProduct].quantity += quantity;
            }
            let result = await cartDB.save();
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductFromCart(cart, product) {
        try {
            const cartDB = await Cart.findById(cart);
            if (!cartDB) {
                throw new Error("Cart not found");
            }
            const findProduct = cartDB.products.findIndex((p) => p._id.toString() === product);
            if (findProduct === -1) {
                throw new Error("Product not found");
            }else{
                cartDB.products.splice(findProduct, 1);
                let result = await cartDB.save();
            }
            console.log(findProduct);
            
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAllProducts(cart) {
        try {
            const cartDB = await Cart.findById(cart);
            if (!cartDB) {
                throw new Error("Cart not found");
            }
            cartDB.products = [];
            let result = await cartDB.save();
        } catch (error) {
            console.log(error);
        }
    }

}

const cartsManager = new CartsManager();

export default cartsManager