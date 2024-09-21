import { json, Router } from "express";
import productsmanager from "../managers/productsManager.js";

const viewsRouter = Router();
const getProducts = productsmanager.getProducts();

viewsRouter.get("/products", async (req, res)=>{
    try {
        const products = await getProducts;
    
        res.render("home", {
            css: "products.css",
            products,
        })
    } catch (error) {
        res.send(json({message: error.message}))
    }
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