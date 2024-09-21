import { json } from "express";
import Products from "../models/products.model.js";

class ProductsManager {

    constructor() {
        this.products = [];

    }

    async getProducts() {
        try {
            return await Products.find({});
        } catch (error) {
            return json({message: error.message})
        }
    }

    async getProductById(id) {
        try {
            return await Products.findById({_id: id});
        } catch (error) {
            return json({message: error.message})
        }
    }
}

const productsmanager = new ProductsManager();
console.log(productsmanager.getProducts());


export default productsmanager