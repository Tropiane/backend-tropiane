import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    purchaseDatetime: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: true
    }
})

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;