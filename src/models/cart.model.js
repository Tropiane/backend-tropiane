import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: [{
        type: Array,
        default: [],
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
})  

const Cart = mongoose.model("Cart", CartSchema);

export default Cart