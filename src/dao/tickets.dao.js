import Ticket from "../controllers/models/ticket.model.js";

export default class TicketDao {
    constructor(){}

    async create(ticket) {
        try {
            return await Ticket.create(ticket);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async getOne(id) {
        try {
            return await Ticket.findById(id);
        } catch (error) {
            console.log(error);
            
        }
    }

    async getAll(filter) {
        try {
            return await Ticket.find({purchaser: filter});
        } catch (error) {
            console.log(error);
            
        }
    }

    async delete(id) {
        try {
            return await Ticket.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
            
        }
    }

    async update(id) {
        try {
            return await Ticket.findOneAndUpdate({_id: id}, {status: "Finalizado"});

        } catch (error) {
            console.log(error);
            
        }
    }
}