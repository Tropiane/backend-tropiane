import ProductsService from "../services/products.service.js";

const service = new ProductsService();

class ProductController {
    constructor() {}

    async getPaginatedProducts(page, limit, category, price, status) {
        return await service.getPaginatedProducts(page, limit, category, price, status);
    }

    async getProductById(id) {
        return await service.getProductById(id);
    }
}

export default ProductController