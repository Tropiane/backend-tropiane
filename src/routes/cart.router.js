import { Router } from 'express';
import cartsManager from '../managers/cartsManager.js';

const cartsRouter = Router();

cartsRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartsManager.getCart(cid);
        res.send(cart);
    } catch (error) {
        console.log(error);
    }
})

cartsRouter.post('/', async (req, res) => {
    try {
        const id = await cartsManager.createCart();
        res.send('cart Id created: ' + id);
    } catch (error) {
        console.log(error);
        
    }
})

cartsRouter.put("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        quantity ? await cartsManager.updateProductQuantity(cid, pid, quantity) : await cartsManager.addProductToCart(cid, pid);
        res.send("Product added/updated in cart");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding product to cart");
    }
});

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
