import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/users.controller.js";

const controller = new UserController();

const router = Router();

router.get("/current", passport.authenticate("current", { session: false }), async(req, res) => {
    const data = req.user;
    const role = "USER";
    const user = await controller.getOne({email: data.email});

    try {
        res.send({
            status: "success",
            userData: user,
            tokenData: data,
            role: "USER"
        })
    } catch (error) {
        console.log(error);
        
    }
});

router.all("*", (req, res) => {
    res.status(404).send({ error: "Endpoint not found" });
});

const sessionsRouter = router;
export default sessionsRouter;