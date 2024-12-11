import { createHash } from "../utils.js";
import CartController from "../controllers/carts.controller.js";

const cartController = new CartController();

export default class UserDto {
    constructor(user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.role = user.role;
        this.cart = user.cart;
        this.password = createHash(user.password);
    }
}