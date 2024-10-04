import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            required: true
        }
    }],
    default: []
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
