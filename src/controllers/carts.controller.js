import CartService from "../services/carts.service.js";

const service = new CartService();

class CartController {
    constructor() {}

    async getCart(cid) {
        return await service.getCart(cid);
    }

    async createCart() {
        return await service.createCart();
    }

    async getTotal(cart) {
        return await service.getTotal(cart);
    }

    async addProductToCart(cart, product) {
        return await service.addProductToCart(cart, product);
    }

    async updateProductQuantity(cart, product, quantity) {
        return await service.updateProductQuantity(cart, product, quantity);
    }

    async deleteProductFromCart(cart, product) {
        return await service.deleteProductFromCart(cart, product);
    }

    async deleteAllProducts(cart) {
        return await service.deleteAllProducts(cart);
    }

    async purchase(cart, data) {
        return await service.purchase(cart, data);
    }

}

export default CartController;