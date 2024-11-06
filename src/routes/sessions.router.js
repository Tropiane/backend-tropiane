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
            payload: user
        })
    } catch (error) {
        console.log(error);
        
    }
});

export default sessionsRouter;