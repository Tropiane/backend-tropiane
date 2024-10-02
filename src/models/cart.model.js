import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products"
            }
        }],
        default: []
    }
})  

const Cart = mongoose.model("Cart", CartSchema);

export default Cart