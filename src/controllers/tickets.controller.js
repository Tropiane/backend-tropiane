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

    async getAll() {
        return await service.getAll();
    }

    async delete(id){
        return await service.deleteTicket(id);
    }
}