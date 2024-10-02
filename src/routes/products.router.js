import { Router } from "express";
import productsmanager from "../managers/productsManager.js";
import uploader from "../middlewares/uploader.js";
import Products from "../models/products.model.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res)=>{
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
        
        res.json(result)

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