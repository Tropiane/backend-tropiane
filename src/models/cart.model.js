import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        }],
        default: []
    }
})  

const Cart = mongoose.model("Cart", CartSchema);

export default Cart