import e, { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set", (req, res) => {
    const dataUser = { user: "Tropiane", email: "tropiane@tropiane" };

    res.cookie("userCookie", JSON.stringify(dataUser), { signed: true});
    res.status(200).send({error:null, data: "cookie guardada"});
});

cookiesRouter.get("/get", (req, res) => {
    if("userCookie" in req.signedCookies) {
        const catchCookie = JSON.parse(req.signedCookies["userCookie"]);
        res.status(200).send({error:null, data: catchCookie});
    } else {
        res.status(200).send({error:"No hay cookie", data: null});
    }
});

cookiesRouter.get("/delete", (req, res) => {
    res.clearCookie("userCookie");
    res.status(200).send({error:null, data: "cookie eliminada"});
});

cookiesRouter.post("/", (req, res) => {
    const dataUser = { user: "Tropiane", email: "tropiane@tropiane" };

    res.cookie("userCookie", JSON.stringify(dataUser), { signed: true});
    res.status(200).send({error:null, data: "cookie guardada"});
})

export default cookiesRouter