import { Router } from "express";
import uploader from "../middlewares/uploader.js";
import Products from "../controllers/models/products.model.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort === 'asc' ? 1 : req.query.sort === 'desc' ? -1 : null;
    const query = req.query.query || {};
    
    try {
        const options = {
            page,
            limit,
            sort: sort ? { price: sort } : null,
            lean: true
        };

        const products = await Products.paginate(query, options);

        const response = {
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}&limit=${limit}` : null,
            nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}&limit=${limit}` : null
        };

        res.json(response);
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});


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

productsRouter.all("*", (req, res) => {
    res.status(404).send({ error: "Endpoint not found" });
});

export default productsRouter;