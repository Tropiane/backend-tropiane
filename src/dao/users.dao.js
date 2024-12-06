import UserModel from "../controllers/models/user.model.js";
import { createHash } from "../utils.js";
import CartController from "../controllers/carts.controller.js";

const controller = new CartController();

class UsersDao {
    constructor() {}

    async getAll(){
        try {
            return await UserModel.find();
        } catch (error) {
            console.log(error);
            
        }
    }

    async getOne(filter){
        try {
            const findUser = await UserModel.findOne(filter).lean();

            if (!findUser) { return "user not found" }

            const {password, ...result} = findUser;
            return result;
        } catch (error) {
            console.log(error);
            
        }
    }

    async getById(id){
        try {
            return await UserModel.findById({_id: id}).lean();
        } catch (error) {
            console.log(error);
            
        }
    }

    async create(user) {
        try {
            user.password = createHash(user.password);
            user.cart = await controller.createCart();
            return await UserModel.create(user);
        } catch (error) {
            if (error.code === 11000) { 
                throw new Error("Email already exists");
            }
            throw error;
        }
    }

    async delete(id){
        try {
            return await UserModel.findByIdAndDelete(id).lean();
        } catch (error) {
            console.log(error);
            
        }
    }

    async update(id, user){
        const findUser = UserModel.findById(id);

        try {
            if (!findUser) { return "user not found" }

            return await UserModel.findByIdAndUpdate(id, user);
        } catch (error) {
            console.log(error);
            
        }
    }
}

const usersDao = new UsersDao();

export default usersDao;