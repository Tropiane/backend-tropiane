import { json, Router } from "express";
import productsmanager from "../managers/productsManager.js";
import cartsManager from "../managers/cartsManager.js";

const viewsRouter = Router();

viewsRouter.get("/products", async(req, res)=>{

    const limit = req.query.limit || 10;
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category;
    const price = parseInt(req.query.price) || null;
    let status;

    if (req.query.status === "true") {
        status = true;
    } else if (req.query.status === "false") {
        status = false;
    } else {
        status = undefined;
    }

    try {
        const products = await productsmanager.getPaginatedProducts(page, limit, category, price, status);
        res.render("home", {
            css: "products.css",
            products
        })
        
    } catch (error) {
        console.log('error al obtener los productos  ',error);
        res.status(500).send("Error al obtener los productos");
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

viewsRouter.get("/cart/:cartId", async (req, res)=>{
    try {
        const {cartId} = req.params;
        const cart = await cartsManager.getCart(cartId);
        const sumTotal = await cartsManager.getTotal(cartId);

        res.render("cart",{
            css: "cart.css",
            cart,
            sumTotal
        })
    } catch (error) {
      console.log(error); 
    }
})

viewsRouter.get("/cookies", async (req, res)=>{
    res.render("cookies", {

    })
})

viewsRouter.get("/login", async (req, res)=>{
    res.render("login", {
        css: "login.css"
    })
})

viewsRouter.get("/register", async (req, res)=>{
    res.render("register", {
        css: "register.css"
    })
})

viewsRouter.get("/profile", async (req, res)=>{
    const data = req.session.userData;
    console.log(req.session);
    
    res.render("profile", {
        data
    })
})

export default viewsRouter