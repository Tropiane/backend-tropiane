
export default class UserDto {
    constructor(user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName.toUpperCase();
        this.email = user.email.toLowerCase();
        this.role = user.role.toUpperCase();
        this.cart = user.cart;
    }
}