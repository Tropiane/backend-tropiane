import Products from "../controllers/models/products.model.js";

class ProductsService {
    constructor() {
        this.products = [];
    }

    async create(product) {
        return await Products.create(product);
    }

    async getPaginatedProducts(page, limit, category, price, status) {
        const query = {};
        category && (query.category = category);
        if (status !== undefined) {
            query.status = status;
        }
        const options = {
            page: page || 1,
            limit: limit || 10,
            sort: { price: price || 1 }
        };
        return await Products.getPaginatedProducts(query, options);
    }

    async getProductById(id) {
        return await Products.getProductById(id);
    }
}

export default ProductsService;
