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

export default cartsRouter;
