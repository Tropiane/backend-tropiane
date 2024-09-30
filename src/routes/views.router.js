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

viewsRouter.get("/cart", async (req, res)=>{
    const {cid} = req.params;
    await cartsManager.createCart();
    res.render("cart", {
        css: "cart.css"
    })
})


viewsRouter.get("/cart/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsManager.getCartById(cid);
        res.render("cartDetails", {
            css: "cart.css",
            cart,
        });
    } catch (error) {
        console.log('Error al obtener carrito:', error);
        res.status(500).send("Error al obtener el carrito");
    }
});


viewsRouter.post("/cart/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await cartsManager.addProductToCart(cid, pid, quantity);
        res.redirect(`/cart/${cid}`);
    } catch (error) {
        console.log('Error al agregar producto al carrito:', error);
        res.status(500).send("Error al agregar producto al carrito");
    }
});


viewsRouter.delete("/cart/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsManager.removeProductFromCart(cid, pid);
        res.redirect(`/cart/${cid}`);
    } catch (error) {
        console.log('Error al eliminar producto del carrito:', error);
        res.status(500).send("Error al eliminar producto del carrito");
    }
});

export default viewsRouter