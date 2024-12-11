import cartDao from "../dao/carts.dao.js";
import ProductController from "../controllers/products.controller.js";
import TicketController from "../controllers/tickets.controller.js";
import ticketDto from "../dto/ticket.dto.js";

const service = new cartDao();
const productController = new ProductController();
const ticketController = new TicketController();

class CartService{

    constructor(){
        this.carts = [];
        
    }

    async createCart(){
        return await service.createCart();
    }

    async getCart(cart){
        return await service.productsInCart(cart);
    }

    async getTotal(cart) {
        let cartDB = await service.productsInCart(cart);
        let totalPrice = 0;

        cartDB.products.map((product) => {
            if (product.product) {
                totalPrice += product.product.price * product.quantity;
            } else {
                console.log(`Producto no encontrado para el ID: ${product._id}`);
            }
        });
        return totalPrice;
    }

    async addProductToCart(cart, product) {
        const cartDB = await service.getCart(cart);
        
        try {
            if (!cartDB) {
                throw new Error("Cart not found");
            }

            const productDB = cartDB.products.find((p) => p.product.toString() === product);
            productDB  !== undefined ? productDB.quantity  ++: cartDB.products.push({product: product});
            
            let result = await cartDB.save();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProductQuantity(cart, product, quantity) {
        try {
            const cartDB = await service.getCart(cart);
            if (!cartDB) {
                throw new Error("Cart not found");
            }
            const productDB = cartDB.products.find((p) => p._id.toString() === product);
            
            productDB ? productDB.quantity = quantity : null;
            
            let result = await cartDB.save();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductFromCart(cart, product) {
        try {
            const cartDB = await service.getCart(cart);

            if (!cartDB) {
                throw new Error("Cart not found");
            }
            const findProduct = cartDB.products.findIndex((p) => p._id.toString() === product);
            
            if (findProduct === -1) {
                throw new Error("Product not found");
            }else{
                cartDB.products.splice(findProduct, 1);
                let result = await cartDB.save();
                return result;
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAllProducts(cart) {
        try {
            const cartDB = await service.getCart(cart);
            if (!cartDB) {
                throw new Error("Cart not found");
            }
            cartDB.products = [];
            let result = await cartDB.save();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async purchase(cart, data) {
        const cartDB = await service.productsInCart(cart);
        const user = data.user;
        const code = data.code;
        let totalPrice = 0;
    
        try {
            for (const product of cartDB.products) {
                const id = product._id.toString();
    
                try {
                    if (product.quantity <= product.product.stock) {
                        
                        totalPrice += product.product.price * product.quantity;
                        product.product.stock -= product.quantity;
                        await product.product.save();
    
                        await this.deleteProductFromCart(cart, id);
                    } else {
                        console.log('No hay stock para el producto ' + product.product.title);
                    }
                } catch (error) {
                    console.log('Error procesando el producto:', product.product.title, error);
                }
            }

            const ticket = new ticketDto(code, Date.now(), totalPrice, user);
            return await ticketController.create(ticket);
        } catch (error) {
            console.log('Error en la compra:', error);
            throw error;
        }
    }
    

}

export default CartService