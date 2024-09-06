import { Router } from "express";
import productsmanager from "../managers/productsManager.js";

const viewsRouter = Router();

const products = productsmanager.getProducts();
const newProducts = productsmanager.addProduct();

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
viewsRouter.get("/realtimeproducts", (req, res)=>{
    res.render("realTimeProducts", {
        css: "realtimeproducts.css",
        newProducts
    })
})

export default viewsRouter