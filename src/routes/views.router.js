import { json, Router } from "express";
import productsmanager from "../managers/productsManager.js";
import cartsManager from "../managers/cartsManager.js";
import usersManager from "../managers/userManager.js";
import passport from "passport";
import config from "../config.js";
import httpServer from "../app.js";
import { verifyToken } from "../utils.js";

const viewsRouter = Router();
let errorLogin= ''

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
});

viewsRouter.get("/createproducts", async (req, res)=>{
    try {
        res.render("createProducts", {
            css: "createProducts.css"
        })
    } catch (error) {
        return json({message: error.message})
    }
});

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
});

viewsRouter.get("/cart/:cartId", verifyToken, async (req, res)=>{
    const data = req.user;
    const user = await usersManager.getOne({email:data.email});
    const findCart = user.cart;
    try {
        const cart = await cartsManager.getCart(findCart);
        const sumTotal = await cartsManager.getTotal(findCart);

        res.render("cart",{
            css: "cart.css",
            findCart,
            cart,
            sumTotal
        })
    } catch (error) {
      console.log(error); 
    }
});

viewsRouter.get("/login", async (req, res)=>{
    httpServer.on('errorLogin', (error) => {
        errorLogin = error
        setTimeout(() => {
            errorLogin = ''
        }, 3000);      
    })

    
    if(!req.signedCookies[`${config.APP_NAME}_cookie`]){
        res.render("login", {
            css: "login.css",
            data: errorLogin
        })
    }else{
        res.redirect("/profile");
    }
});

viewsRouter.get("/register", async (req, res)=>{
    res.render("register", {
        css: "register.css"
    })
});

viewsRouter.get("/profile", verifyToken ,async (req, res)=>{
    const data = await usersManager.getOne({email: req.user.email});
    
    res.render("profile", {
        data
    })
});


export default viewsRouter