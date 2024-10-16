import UserModel from "../models/user.model.js";

class userManager {
    constructor(){}
    
    async getAll(){
        try {
            return await UserModel.find().lean();
        } catch (error) {
            console.log(error);
            
        }
    }

    async getById(id){
        try {
            return await UserModel.findById(id).lean();
        } catch (error) {
            console.log(error);
            
        }
    }

    async create(user){
        try {
            return await UserModel.create(user);
        } catch (error) {
            console.log(error);
            
        }
    }

    async delete(id){
        try {
            return await UserModel.findByIdAndDelete(id);
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

const usersManager = new userManager();
export default usersManager