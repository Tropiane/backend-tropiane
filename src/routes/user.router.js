import { Router } from "express";
import passport from "passport";

import { createToken, verifyToken } from "../utils.js";
import UserController from "../controllers/users.controller.js";
import UserDto from "../dto/user.dto.js";
import validateRegister from "../middlewares/register.js";
import initAuthStrategies from "../auth/passport.config.js";
import config from "../config.js";
import CartController from "../controllers/carts.controller.js";
import httpServer from "../app.js";

const userRouter = Router();
const userController = new UserController();
const cartController = new CartController();

initAuthStrategies();

userRouter.get("/ghlogin", passport.authenticate("ghlogin", { scope: ["user:email"] }), (req, res) => {});

userRouter.get("/ghcallback", 
    passport.authenticate("ghlogin", { failureRedirect: "/login", failureMessage: "GitHub login failed" }), 
    (req, res) => {
        const process = userController.getOne({ email: req.user.email });
        if (process) {
            const payload = { email: req.user.email, admin: true };
            const token = createToken(payload, '1h');
            res.cookie(`${config.APP_NAME}_cookie`, token, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000,
                signed: true
            });
            res.redirect("/profile");
        }else{
            res.redirect("/login");
        }
    }
);

// Param handler
userRouter.param("uid", async (req, res, next, uid) => {
    try {
        const user = await userController.getById(uid);
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Other routes
userRouter.get("/", async (req, res) => {
    try {
        const data = await userController.getAll();
        const result = data.map(user => new UserDto(user));
        res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userRouter.get("/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
        const user = await userController.getById(uid);
        const result = new UserDto(user);
        
        res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userRouter.post("/", async (req, res) => {
    const { name, age, email, password } = req.body;
    const user = { name, age, email, password };
    try {
        const result = await userController.create(user);
        res.send({
            message: "User created",
            payload: result
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userRouter.put("/:uid", async (req, res) => {
    const { uid } = req.params;
    const { name, age, email } = req.body;
    try {
        const newUser = {
            name: name ?? user.name,
            age: age ?? user.age,
            email: email ?? user.email
        };
        const updateUser = await userController.update(uid, newUser);
        res.send({
            message: "User updated",
            payload: updateUser
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userRouter.delete("/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
        const result = await userController.delete(uid);
        res.status(200).json({ message: "User deleted", payload: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userRouter.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(400).json({ message: "Logout error" });
        } else {
            res.redirect("/login");
        }
    });
});

userRouter.post("/logoutjwt", (req, res) => {
    res.clearCookie(`${config.APP_NAME}_cookie`);
    res.redirect("/login");
});

userRouter.post("/register", validateRegister, async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    let cart;
    const user = { firstName, lastName, email, password, cart };
    try {
        if (user.name === "" || user.age === "" || user.email === "" || user.password === "") {
            res.redirect("/register");
            httpServer.emit('errorLogin', 'Todos los campos son obligatorios');
        } else {
            await userController.create(user);
            res.redirect("/login")
        }
    } catch (error) {
        console.log(error);
    }
});

userRouter.post("/login", passport.authenticate("login", { failureRedirect: "/login" }), (req, res) => {
    req.session.save((err) => {
        if (err) {
            return res.status(500).json({ message: "Session save error" });
        }
        res.redirect("/profile");
    });
});

userRouter.post("/jwtlogin", async (req, res) => {
    const { username, password } = req.body;
    if (username !== '' && password !== '') {
        const process = await userController.authenticate(username, password);
        if (process) {
            const payload = { email: username, admin: true };
            const token = createToken(payload, '1h');
            res.cookie(`${config.APP_NAME}_cookie`, token, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000,
                signed: true
            });
            res.redirect("/profile");
        } else {
            res.redirect("/login");
            httpServer.emit('errorLogin', 'Credenciales incorrectas');
        }
    } else {
        res.redirect("/login");
        httpServer.emit('errorLogin', 'Faltan campos: obligatorios username, password');
    }
});

userRouter.get("/profile", verifyToken, (req, res) => {
    res.status(200).send({ error: null, data: req.user });
});

userRouter.all("*", (req, res) => {
    res.status(404).send({ error: "Endpoint not found" });
});

export default userRouter