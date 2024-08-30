import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/products", (req, res)=>{
    const data = {title: "Products"}
    res.render("products", {
        css: "products.css",
        data
    })
})

export default viewsRouter