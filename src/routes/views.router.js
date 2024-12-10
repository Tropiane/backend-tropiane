import { json, Router } from "express";
import ProductController from "../controllers/products.controller.js";
import UserController from "../controllers/users.controller.js";
import CartController from "../controllers/carts.controller.js";
import config from "../config.js";
import httpServer from "../app.js";
import { verifyToken } from "../utils.js";
import { authorizeRole } from "../middlewares/authorize.role.js";
import TicketController from "../controllers/tickets.controller.js";

const viewsRouter = Router();

const productController = new ProductController();
const userController = new UserController();
const cartController = new CartController();
const ticketController = new TicketController();

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
        const products = await productController.getPaginatedProducts(page, limit, category, price, status);
        res.render("home", {
            css: "products.css",
            products
        })
        
    } catch (error) {
        console.log('error al obtener los productos  ',error);
        res.status(500).send("Error al obtener los productos");
    }
});

viewsRouter.get("/createproducts", verifyToken, authorizeRole("ADMIN"), async (req, res)=>{
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
        const product = await productController.getProductById(pid);
        
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
    const user = await userController.getOne({email:data.email});
    const findCart = user.cart;
    
    try {
        const cart = await cartController.getCart(findCart);
        const sumTotal = await cartController.getTotal(findCart);
        
        res.render("cart",{
            css: "cart.css",
            findCart,
            cart: cart.products,
            sumTotal,
            user: user.email
        })
    } catch (error) {
      console.log(error); 
    }
});

viewsRouter.get("/cart/:cartid/purchase", verifyToken, async (req, res)=>{
    const data = req.user;
    const tickets = await ticketController.getAll(data.email);
    console.log(data);
    
    res.render("purchase",{
        css: "purchase.css",
        tickets
    })
    
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
    httpServer.on('errorLogin', (error) => {
        errorLogin = error
        setTimeout(() => {
            errorLogin = ''
        }, 3000);      
    })

    res.render("register", {
        css: "register.css",
        data:errorLogin
    })
});

viewsRouter.get("/profile", verifyToken ,async (req, res)=>{
    const data = await userController.getOne({email: req.user.email});
    
    res.render("profile", {
        data
    })
});


export default viewsRouter