import ProductsDao from "../dao/products.dao.js";

const service = new ProductsDao();
class ProductsService {
    constructor() {
        this.products = [];
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
        return await service.getPaginatedProducts(query, options);
    }

    async getProductById(id) {
        return await service.getProductById(id);
    }
}

export default ProductsService;
