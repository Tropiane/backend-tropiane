import { Router } from "express";
import Products from "../models/products.model.js";
import uploader from "../middlewares/uploader.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res)=>{
    try {
        const {limit} = req.query;
        const products = await Products.find({});

        const limitProducts = limit ? products.slice(0, parseInt(limit)) : products;

        res.send(limitProducts)

    } catch (error) {
        res.json({message: error.message})
    }
})

productsRouter.get("/:id", async (req, res)=>{
    const {id} = req.params;
    const findProduct = await Products.findById({_id: id})
    res.status(200).json(findProduct)
})

productsRouter.post("/", uploader.single('image'), async (req, res) => {
    try {
        const body = req.body;
        const image = req.file ? `/images/${req.file.filename}` : null;

        const newProduct = {
            ...body,
            image
        };

        await Products.create(newProduct);
        res.status(200).json({ message: "Product created", product: newProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

productsRouter.patch("/:id", async (req, res)=>{
    try {
        const {id} = req.params;
        const body = req.body;
        await Products.updateOne({_id: id}, body);
        res.status(200).json({message: "product updated"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

productsRouter.delete("/:pid", async (req, res)=>{
    const {pid} = req.params;
    await Products.deleteOne({_id: pid});
    
    res.send(`Product ${pid} deleted`);
})

export default productsRouter;