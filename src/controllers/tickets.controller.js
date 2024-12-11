import TicketService from "../services/tickets.service.js";

const service = new TicketService();

export default class TicketController {
    constructor() {}

    async create (ticket) {
        return await service.createTicket(ticket);
    }

    async getOne(id) {
        return await service.getOne(id);
    }

    async getAll(filter) {
        return await service.getAll(filter);
    }

    async delete(id){
        return await service.deleteTicket(id);
    }

    async update(id){
        return await service.updateTicket(id);
    }
}