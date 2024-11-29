import Cart from "../controllers/models/cart.model.js";

class CartService{

    constructor(){
        this.carts = [];
        
    }

    async createCart(){
        
        const newCart = await Cart.create({products: []});
        console.log("Cart ID created " + newCart._id);
        
        return newCart._id;
    }

    async getCart(cart){
        let cartDB = await Cart.findById(cart).populate("products.product");
        
        return cartDB.products;
    }

    async getTotal(cart) {
        let cartDB = await Cart.findById(cart).populate("products.product");
        let totalPrice = 0;

        
        cartDB.products.forEach((product) => {
            
            if (product.product) {
                totalPrice += product.product.price * product.quantity;
            } else {
                console.log(`Producto no encontrado para el ID: ${product._id}`);
            }
        });
        return totalPrice;
    }

    async addProductToCart(cart, product) {
        try {
            const cartDB = await Cart.findById(cart);
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
            const cartDB = await Cart.findById(cart);
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
            const cartDB = await Cart.findById(cart);
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
            const cartDB = await Cart.findById(cart);
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

}

export default CartService