import { Router } from "express";
import fs from "fs";

const cartRouter = Router();

let carts = [];

const PATH = "src/public/carrito.json";
const cartFile =  fs.readFileSync(PATH, "utf-8");
const data = JSON.parse(cartFile);

fs.existsSync(PATH) ? carts = data : fs.writeFileSync(PATH, JSON.stringify(carts, null, 2));

cartRouter.get("/", (req, res)=>{res.send(data)})

cartRouter.get("/:cid", (req, res)=>{
    const {cid} = req.params;
    const findCart = data.findIndex(c => c.id === parseInt(cid));

    findCart !== -1 ? res.send(`products in cart: ${cid}  ${data[findCart].products}`) : res.send("Cart not found");
});

cartRouter.post("/", (req, res)=>{
    const newCart = {
        id: data.length === 0 ? 1 : data[data.length-1].id + 1,
        products: []
    }

    carts.push(newCart)
    fs.writeFileSync(PATH, JSON.stringify(carts, null, 2))
    res.send(`Cart ${newCart.id} created`)
})

cartRouter.post("/:cid/product/:pid", (req, res) => {
    const { cid, pid } = req.params;

    const findCart = carts.find(c => c.id === parseInt(cid));
    const findProduct = findCart.products.findIndex(p => p.id === parseInt(pid));

    const newProduct = {
        id: findProduct === -1 ? parseInt(pid) : findCart.products[findCart.products.length - 1].id + 1,
        quantity: 1
    }

    findProduct === -1 ? findCart.products.push(newProduct) : findCart.products[findProduct].quantity += 1;

    fs.writeFileSync(PATH, JSON.stringify(carts, null, 2));
    res.send(`Product ${pid} added to cart ${cid}`);
});

export default cartRouter;