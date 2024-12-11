import { Router } from 'express';
import CartController from '../controllers/carts.controller.js';
import { verifyToken } from '../utils.js';
import { authorizeRole } from '../middlewares/authorize.role.js';

const router = Router();
const controller = new CartController();

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await controller.getCart(cid);
        res.send(cart);
    } catch (error) {
        console.log(error);
    }
})

router.post('/', async (req, res) => {
    try {
        const id = await controller.createCart();
        res.send('cart Id created: ' + id);
    } catch (error) {
        console.log(error);
        
    }
})

router.put("/:cid/product/:pid",verifyToken, authorizeRole("USER"), async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    
    try {
        quantity ? await controller.updateProductQuantity(cid, pid, quantity) : await controller.addProductToCart(cid, pid);
        res.send("Product added/updated in cart");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding product to cart");
    }
});

router.delete("/:cid/product/:pid",verifyToken, authorizeRole("USER"), async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await controller.deleteProductFromCart(cid, pid);
        res.send("Product deleted from cart");
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:cid",verifyToken, authorizeRole("USER"), async (req, res) => {
    const { cid } = req.params;
    try {
        await controller.deleteAllProducts(cid);
        res.send("Cart deleted");
    } catch (error) {
        console.log(error);
    }
})

router.get("/:cid/purchase",verifyToken,authorizeRole("USER"), async (req, res) => {
    const { cid } = req.params;
    const cart= await controller.getCart(cid);
    res.send(cart);
})

router.post("/:cid/purchase",verifyToken, authorizeRole("USER"), async (req, res) => {
    const { cid } = req.params;
    const data = req.body;
    console.log(data);
    
    try {
        await controller.purchase(cid, data);
        res.send("Purchase completed");
    } catch (error) {
        console.log(error);
    }
})

const cartRouter = router;
export default cartRouter;
