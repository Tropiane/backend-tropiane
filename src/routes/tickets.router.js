import { Router } from "express";
import TicketController from "../controllers/tickets.controller.js";
import ticketDto from "../dto/ticket.dto.js";
import UserController from "../controllers/users.controller.js";
import { purchaseMail } from "../utils.js";

const controller = new TicketController();
const userController = new UserController();
const router = Router();

router.get("/", async (req, res) => {
    const data = await controller.getAll();

    res.json({status: "success", payload: data});
})

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        
        const ticket = new ticketDto(data.code, data.purchaseDatetime=Date.now(), data.total, data.user); 
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

router.delete("/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const ticket = await controller.delete(id);
        res.json({status: "success", payload: ticket});
    } catch (error) {
        res.send({status: "error", error: error.message});
    }
})

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    
    try {
        const ticket = await controller.update(id);
        const user = await userController.getOne(ticket.user);
        purchaseMail(user, ticket);
        
        res.json({status: "success", payload: ticket});
    } catch (error) {
        res.send({status: "error", error: error.message});
    }
})

const ticketsRouter = router;
export default ticketsRouter;