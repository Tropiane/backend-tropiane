import { Router } from "express";
import passport from "passport";

import { createToken, verifyToken } from "../utils.js";
import usersManager from "../managers/userManager.js";
import validateRegister from "../middlewares/register.js";
import initAuthStrategies from "../auth/passport.config.js";
import config from "../config.js";
import cartsManager from "../managers/cartsManager.js";


const userRouter = Router();
initAuthStrategies();

userRouter.get("/", async (req, res) => {
    try {
        const result = await usersManager.getAll();
        res.send({
            status: "success",
            payload: result
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userRouter.post("/", async (req, res) => {
    const {name, age, email, password} = req.body;
    const user = {name, age, email, password};
     try {
        const result = await usersManager.create(user);
        res.send({
            message: "User created",
            payload: result
        })
     } catch (error) {
        res.status(400).json({ message: error.message });
     }
});

userRouter.put("/:uid", async (req, res) => {
    const {uid} = req.params;
    const {name, age, email} = req.body;

    try {
        const newUser = {
            name: name ?? user.name,
            age: age ?? user.age,
            email: email ?? user.email
        }
        const updateUser = await usersManager.update(uid, newUser);

        res.send({
            message: "User updated",
            payload: updateUser
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userRouter.delete("/:uid", async (req, res) => {
    const {uid} = req.params;
    try {
        const result = await usersManager.delete(uid);

        res.status(200).json({message: "User deleted", payload: result})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userRouter.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            returnres.status(400).json({message: "Logout error"});
        }else{

            res.redirect("/login");
        }
    });
})

userRouter.post("/register", validateRegister, async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    const cart = await cartsManager.createCart();
    const user = {firstName, lastName, email, password, cart};

    try {
        if(user.name === "" || user.age === "" || user.email === "" || user.password === "") {
            res.status(400).json({message: "All fields are required"});

        }else{
            usersManager.create(user);
            res.status(200).json({message: "User created with email: " + user.email});
        }
    } catch (error) {
        console.log(error);
        
    }
})

userRouter.post("/login", passport.authenticate("login", {failureRedirect: "/login"}) ,(req, res) => {
    req.session.save((err) => {
        if (err) {
            return res.status(500).json({ message: "Session save error" });
        }
        res.redirect("/profile");
    })
})

userRouter.get("/ghlogin", passport.authenticate("ghlogin", {scope: ["user:email"]}), (req, res) => {})

userRouter.get("/ghcallback", 
    passport.authenticate("ghlogin", { failureRedirect: "/login", failureMessage: "GitHub login failed" }), 
    (req, res) => {
        req.session.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Session save error" });
            }
            res.redirect("/profile");
        });
    }
);

userRouter.post('/jwtlogin', async (req, res) => {
    const { username, password } = req.body;

    if (username != '' && password != '') {
        const process = await usersManager.authenticate(username, password);
        
        if (process) {
            const payload = { email: username, admin: true };
            const token = createToken(payload, '1h');
            
             res.cookie(`${config.APP_NAME}_cookie`, token, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000,
                signed: true
            });

            res.status(200).send({ error: null, data: [token] });
        } else {
            res.status(401).send({ error: 'Usuario o clave no válidos', data: [token] });
        }
    } else {
        res.status(400).send({ error: 'Faltan campos: obligatorios username, password', data: [] });
    }
});

userRouter.get('/profile', passport.authenticate('jwtlogin', { session: false }), (req, res) => {
    res.status(200).send({ error: null, data: req.user });
});

export default userRouter