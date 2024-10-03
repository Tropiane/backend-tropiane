import Cart from "../models/cart.model.js";

class CartsManager{

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
                totalPrice += product.product.price;
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
            
            const findProduct = cartDB.products.findIndex((p) => p.product.toString() === product);
            const quantity = 1;
            if (findProduct === -1) {
                cartDB.products.push({product});
            } else {
                cartDB.products.find((p) => p.product.toString() === product).quantity + 1;
            }

            return await cartDB.save();
        } catch (error) {
            console.log(error);
        }
    }

    async sumProducts(cart, product, quantity) {
        try {
            const cartDB = await Cart.findById(cart);
            if (!cartDB) {
                throw new Error("Cart not found");
            }
            const productDB = cartDB.products.find((p) => p._id.toString() === product);
            if (!productDB) {
                throw new Error("Product not found");
            }
            productDB.quantity = quantity;
            return cartDB.save();
        } catch (error) {
            
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
            }
            console.log(findProduct);
            
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
        } catch (error) {
            console.log(error);
        }
    }

}

const cartsManager = new CartsManager();

export default cartsManager