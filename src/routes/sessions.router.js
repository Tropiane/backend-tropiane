import { Router } from "express";
import passport from "passport";
import usersManager from "../managers/userManager.js";

const sessionsRouter = Router();

sessionsRouter.get("/current", passport.authenticate("current", { session: false }), async(req, res) => {
    const data = req.user;
    const user = await usersManager.getOne({email: data.email});

    try {
        res.send({
            status: "success",
            userData: user,
            tokenData: data
        })
    } catch (error) {
        console.log(error);
        
    }
});

sessionsRouter.all("*", (req, res) => {
    res.status(404).send({ error: "Endpoint not found" });
});

export default sessionsRouter;