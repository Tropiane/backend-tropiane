import { Router } from 'express';
import cartsManager from '../managers/cartsManager.js';

const cartsRouter = Router();

cartsRouter.post('/', async (req, res) => {
    try {
        const id = await cartsManager.createCart();
        res.send(id);
    } catch (error) {
        console.log(error);
        
    }
})

cartsRouter.put("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        await cartsManager.addProductToCart(cid, pid, quantity);
        res.send("Product added to cart");
    } catch (error) {
        console.log(error);
    }
})

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await cartsManager.deleteProductFromCart(cid, pid);
        res.send("Product deleted from cart");
    } catch (error) {
        console.log(error);
    }
})

cartsRouter.delete("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        await cartsManager.deleteAllProducts(cid);
        res.send("Cart deleted");
    } catch (error) {
        console.log(error);
    }
})

export default cartsRouter;
