import Ticket from "../controllers/models/ticket.model.js";

export default class TicketDao {
    constructor(){}

    async create(ticket) {
        return await Ticket.create(ticket);
    }

    async getOne(id) {
        return await Ticket.findById(id);
    }

    async getAll() {
        return await Ticket.find({});
    }

    async delete(id) {
        return await Ticket.delete(id);
    }
}