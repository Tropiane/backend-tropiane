import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        index: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:String,
    status:{
        type: Boolean,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true,
        index: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    quantity: {
        type: Number,
        default: 1
    }
});

ProductSchema.plugin(mongoosePaginate)

const Products = mongoose.model("Products", ProductSchema)

export default Products;