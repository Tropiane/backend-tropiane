import Cart from "../controllers/models/cart.model.js";

const controller = Cart;

export default class cartDao{
    constructor(){};

    async createCart(){
        
        const newCart = await controller.create({products: []});
        console.log("Cart ID created " + newCart._id);
        
        return newCart._id;
    }

    async getCart(cid){
        return await controller.find({_id: cid});
    }

    async productsInCart(cid){
        return await controller.findById(cid).populate("products.product");
    }
}