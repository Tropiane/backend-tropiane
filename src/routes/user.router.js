import { Router } from "express";
import usersManager from "../managers/userManager.js";
import auth from "../middlewares/auth.js";
import validateRegister from "../middlewares/register.js";

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

userRouter.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await usersManager.authenticate(username, password);

    try {
        if(!user){
            res.status(400).json({message: "Invalid credentials"});
        }else{
            req.session.userData = user;
            req.session.save(err => {
                if (err) return res.status(500).json({message: "Session save error"});

                res.redirect("/profile");
            });
        }
    } catch (error) {
        json.status(400).json({message: error.message});
    }
})

userRouter.post("/register", validateRegister, async (req, res) => {
    const {name, age, email, password} = req.body;
    const user = {name, age, email, password};

    try {
        usersManager.create(user);
        res.status(200).json({message: "User created with email: " + user.email});
    } catch (error) {
        console.log(error);
        
    }
})

userRouter.get("/private", auth, (req, res) => {
    res.status(200).json({error: null, data: "Si ves esto, estas autenticado"});
})

export default userRouter