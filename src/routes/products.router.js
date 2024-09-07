import { Router } from "express";
import fs from "fs";
import { io } from "../app.js";

const productsRouter = Router();

const PATH = "src/public/productos.json";

let products = [];

const productFile =  fs.readFileSync(PATH, "utf-8");
const data = JSON.parse(productFile);

fs.existsSync(PATH) ? products = data : fs.writeFileSync(PATH, JSON.stringify(products, null, 2));

productsRouter.get("/", (req, res)=>{
    const {limit} = req.query;
    const limitProducts = limit ? data.slice(0, parseInt(limit)) : data;
    
    res.send(limitProducts)
})

productsRouter.get("/:id", (req, res)=>{
    const {id} = req.params;
    const findProduct = products.findIndex(p => p.id === parseInt(id));

    findProduct !== -1 ? res.send(products[findProduct]) : res.status(404).send("Product not found");
})

productsRouter.post("/", (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnail } = req.body;
    const newProduct = { title, description, code, price, status, stock, category, thumbnail };
  
    if (!title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).send("All fields are required");
    }

    newProduct.id = parseInt(data[data.length-1].id) + 1;
    products.push(newProduct);
  
    fs.writeFileSync(PATH, JSON.stringify(products, null, 2));
  
    io.emit('productAdded', newProduct);
  
    res.status(201).send(newProduct);
  });

productsRouter.put("/:pid", (req, res)=>{
    const {pid} = req.params;
    const {title, description, code, price, status, stock, category, thumbnail} = req.body;

    const findProduct = products.findIndex(p=> p.id === parseInt(pid));
    const modifyedProduct = {title, description, code, price, status, stock, category, thumbnail};

    modifyedProduct.id = products[findProduct].id
    findProduct === -1 ? res.status(404).send(`Product ${pid} not found`) :  products[findProduct] = modifyedProduct;

    fs.writeFileSync(PATH, JSON.stringify(products, null, 2));
    res.send(`Product ${pid} modified`);
})

productsRouter.delete("/:pid", (req, res)=>{
    const {pid} = req.params;
    const findProduct = products.findIndex(p => p.id === parseInt(pid));

    findProduct !== -1 ? products.splice(findProduct, 1) : res.status(201).send("Product not found");
    
    fs.writeFileSync(PATH, JSON.stringify(products, null, 2));
    res.send(`Product ${pid} deleted`);
})

export default productsRouter;