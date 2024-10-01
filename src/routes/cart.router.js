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
        await cartsManager.addProductToCart(cid, pid);
        res.send("Product added to cart");
    } catch (error) {
        console.log(error);
    }
})

export default cartsRouter;
