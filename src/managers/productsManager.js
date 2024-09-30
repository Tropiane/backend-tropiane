import Products from "../models/products.model.js";

class ProductsManager {
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
    
        try { 
            
            return await Products.paginate(query, options);
        } catch (error) {
            console.error("Error en la paginación:", error);
            throw new Error(error.message);
        }
    }

    async getProductById(id) {
        try {
            return await Products.findById({ _id: id });
        } catch (error) {
            console.error("Error al obtener producto por ID:", error);
            throw new Error(error.message);
        }
    }
}

const productsmanager = new ProductsManager();

export default productsmanager;
