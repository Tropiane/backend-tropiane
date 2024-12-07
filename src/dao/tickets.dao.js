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

    async getAll() {
        try {
            return await Ticket.find({});
        } catch (error) {
            console.log(error);
            
        }
    }

    async delete(id) {
        try {
            return await Ticket.delete(id);
        } catch (error) {
            console.log(error);
            
        }
    }
}