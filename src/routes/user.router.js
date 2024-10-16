import { Router } from "express";
import usersManager from "../managers/userManager.js";
import auth from "../middlewares/auth.js";

const userRouter = Router();

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
    const {name, age, email} = req.body;
    const user = {name, age, email};
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
        } else {
            res.status(200).json({message: "Logout successful"});
        }
    });
})

userRouter.post("/login", async (req, res) => {
    const {username, password} = req.body;

    try {
        if (username === "admin" && password === "fede123") {
            req.session.userData = {username: username, admin: true};
            res.redirect("/api/users/private");
        } else {
            res.status(401).json({message: "Invalid credentials"});
        }
    } catch (error) {
        
    }
})

userRouter.get("/private", auth, (req, res) => {
    res.status(200).json({error: null, data: "Si ves esto, estas autenticado"});
})

export default userRouter