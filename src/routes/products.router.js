import { Router } from "express";
import fs from "fs";

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
    const findProduct = products.findIndex(p=> p.id === parseInt(id));

    findProduct !== -1 ? res.send(products[findProduct]) : res.send("Product not found");
})

productsRouter.post("/", (req, res)=>{
    const {title, description, code, price, status, stock, category, thumbnail} = req.body;
    const newProduct = {title, description, code, price, status, stock, category, thumbnail}
    
    !title || !description || !code || !price || !status || !stock || !category ? res.send("incomplete data") : res.send(`Product Created`);

    newProduct.id = parseInt(data[data.length-1].id) + 1;
    products.push(newProduct);

    const productWrite = () => {fs.writeFileSync("src/public/productos.json", JSON.stringify(products, null, 2))};
    productWrite();

})

productsRouter.put("/:pid", (req, res)=>{
    const {pid} = req.params;
    const {title, description, code, price, status, stock, category, thumbnail} = req.body;

    const findProduct = products.findIndex(p=> p.id === parseInt(pid));
    const modifyedProduct = {title, description, code, price, status, stock, category, thumbnail};

    modifyedProduct.id = products[findProduct].id
    findProduct === -1 ? res.send(`Product ${pid} not found`) :  products[findProduct] = modifyedProduct;

    fs.writeFileSync(PATH, JSON.stringify(products, null, 2));
    res.send(`Product ${pid} modified`);
})

productsRouter.delete("/:pid", (req, res)=>{
    const {pid} = req.params;
    const findProduct = products.findIndex(p => p.id === parseInt(pid));

    findProduct !== -1 ? products.splice(findProduct, 1) : res.send("Product not found");
    
    fs.writeFileSync(PATH, JSON.stringify(products, null, 2));
    res.send(`Product ${pid} deleted`);
})

export default productsRouter