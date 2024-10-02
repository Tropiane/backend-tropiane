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

    async addProductToCart(cart, product) {
        try {
            const cartDB = await Cart.findById(cart);
            if (!cartDB) {
                throw new Error("Cart not found");
            }
            cartDB.products.push({ product });
            let result = await cartDB.save();

        } catch (error) {
            console.log(error);
        }
    }
}

const cartsManager = new CartsManager();

export default cartsManager