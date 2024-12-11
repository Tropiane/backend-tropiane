import TicketDao from "../dao/tickets.dao.js";

export default class TicketService {
    constructor() {
        this.ticketDao = new TicketDao();
    }

    async createTicket(ticket) {
        return await this.ticketDao.create(ticket);
    }

    async getOne(id) {
        return await this.ticketDao.getOne(id);
    }

    async getAll(filter) {
        return await this.ticketDao.getAll(filter);
    }

    async deleteTicket(id) {
        return await this.ticketDao.delete(id);
    }

    async updateTicket(id) {
        return await this.ticketDao.update(id);
    }
}