import { Router } from 'express';
import CartController from '../controllers/carts.controller.js';

const cartsRouter = Router();

const cartController = new CartController();

cartsRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartController.getCart(cid);
        res.send(cart);
    } catch (error) {
        console.log(error);
    }
})

cartsRouter.post('/', async (req, res) => {
    try {
        const id = await cartController.createCart();
        res.send('cart Id created: ' + id);
    } catch (error) {
        console.log(error);
        
    }
})

cartsRouter.put("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        quantity ? await cartController.updateProductQuantity(cid, pid, quantity) : await cartController.addProductToCart(cid, pid);
        res.send("Product added/updated in cart");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding product to cart");
    }
});

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await cartController.deleteProductFromCart(cid, pid);
        res.send("Product deleted from cart");
    } catch (error) {
        console.log(error);
    }
})

cartsRouter.delete("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        await cartController.deleteAllProducts(cid);
        res.send("Cart deleted");
    } catch (error) {
        console.log(error);
    }
})

export default cartsRouter;
