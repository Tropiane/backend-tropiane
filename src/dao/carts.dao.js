import Cart from "../controllers/models/cart.model.js";

const controller = Cart;

export default class cartDao{
    constructor(){};

    async createCart(){
        const newCart = await controller.create({products: []});
        
        return newCart._id;
    }

    async getCart(cid){
        return await controller.findOne({_id: cid});
    }

    async productsInCart(cid){
        return await controller.findById(cid).populate("products.product");
    }
}