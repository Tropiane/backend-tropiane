import fs from "fs";

class ProductsManager {

    constructor() {
        this.products = [];

    }

    getProducts() {
        const productFile =  fs.readFileSync("src/public/productos.json", "utf-8");
        const data = JSON.parse(productFile);
        return data
    }

    addProduct() {

    }
}

const productsmanager = new ProductsManager();


export default productsmanager