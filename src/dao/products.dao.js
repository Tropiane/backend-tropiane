import Products from "../controllers/models/products.model.js";

const controller = Products;

export default class ProductsDao {
    constructor() {}

    async getPaginatedProducts(query, options) {
        try { 
            
            return await controller.paginate(query, options);
        } catch (error) {
            console.error("Error en la paginación:", error);
            throw new Error(error.message);
        }
    }

    async getProductById(id) {
        try {
            return await controller.findById({ _id: id });
        } catch (error) {
            console.error("Error al obtener producto por ID:", error);
            throw new Error(error.message);
        }
    }
} 