import { Router } from "express";

const router = Router();

router.get("/set", (req, res) => {
    const dataUser = { user: "Tropiane", email: "tropiane@tropiane" };

    res.cookie("userCookie", JSON.stringify(dataUser), { signed: true});
    res.status(200).send({error:null, data: "cookie guardada"});
});

router.get("/get", (req, res) => {
    if("userCookie" in req.signedCookies) {
        const catchCookie = JSON.parse(req.signedCookies["userCookie"]);
        res.status(200).send({error:null, data: catchCookie});
    } else {
        res.status(200).send({error:"No hay cookie", data: null});
    }
});

router.get("/delete", (req, res) => {
    res.clearCookie("userCookie");
    res.status(200).send({error:null, data: "cookie eliminada"});
});

router.post("/", (req, res) => {
    const dataUser = { user: "Tropiane", email: "tropiane@tropiane" };

    res.cookie("userCookie", JSON.stringify(dataUser), { signed: true});
    res.status(200).send({error:null, data: "cookie guardada"});
});

const cookiesRouter = router;
export default cookiesRouter