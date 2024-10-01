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

    async getCart(){
        const cart = localStorage.getItem("cartID");
        const cartDB = await Cart.findById(cart);
        console.log(cartDB);
        
    }
}

const cartsManager = new CartsManager();

export default cartsManager