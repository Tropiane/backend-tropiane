import { Router } from "express";
import productsmanager from "../managers/productsManager.js";

const viewsRouter = Router();

const products = productsmanager.getProducts();

viewsRouter.get("/products", (req, res)=>{
    res.render("home", {
        css: "products.css",
        products,
    })
})

viewsRouter.get("/realtimeproducts", (req, res)=>{
    res.render("realTimeProducts", {
        css: "realtimeproducts.css",
        products
    })
})
export default viewsRouter