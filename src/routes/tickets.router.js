import { Router } from "express";
import TicketController from "../controllers/tickets.controller.js";
import ticketDto from "../dto/ticket.dto.js";

const controller = new TicketController();
const router = Router();

router.get("/", async (req, res) => {
    const data = await controller.getAll();

    res.json({status: "success", payload: data});
})

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const ticket = new ticketDto(data.code, data.purchaseDatetime=Date.now(), data.amount, data.purchaser);
        const newTicket = await controller.create(ticket);
    
        res.json({status: "success", payload: newTicket});
    } catch (error) {
        res.send({status: "error", error: error.message});
        
    }

})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await controller.getOne(id);
        res.json({status: "success", payload: ticket});
    } catch (error) {
        res.send({status: "error", error: error.message});
    }
})

const ticketsRouter = router;
export default ticketsRouter;