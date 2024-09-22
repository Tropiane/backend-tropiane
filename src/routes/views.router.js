import { json, Router } from "express";
import productsmanager from "../managers/productsManager.js";

const viewsRouter = Router();

viewsRouter.get("/products", async(req, res)=>{

    const products = await productsmanager.getProducts({});
        res.render("home", {
            css: "products.css",
            products,
        })
})

viewsRouter.get("/createProducts", async (req, res)=>{
    try {

        res.render("createProducts", {
            css: "createProducts.css"
        })
    } catch (error) {
        return json({message: error.message})
    }
})

viewsRouter.get("/details/:pid", async (req, res)=>{
    try {
        const {pid} = req.params;
        const product = await productsmanager.getProductById(pid);
        
        res.render("productDetails",{
            css: "productDetails.css",
            product,
        })
    } catch (error) {
      console.log(error); 
    }
    
})
export default viewsRouter