import { Router } from 'express';
import CartsManager from '../managers/cartsManager.js';

const cartsRouter = Router();

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {

    let Createcart = await CartsManager.getCartById(cid);
    if (!Createcart) {
      cart = await CartsManager.createCart();
    }

    const cart = await CartsManager.addProductToCart(cid, pid, quantity);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cartsRouter.post('/create', async (req, res) => {
    try {
      const newCart = await CartsManager.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

export default cartsRouter;
