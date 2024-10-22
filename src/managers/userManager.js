import { json } from "express";
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

    async create(user) {
        try {
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

    async authenticate(username, password){
        try {
            const filter = {email: username, password: password};
            const findUser = await UserModel.findOne(filter).lean();
            
            if(findUser){
                const {password, ...result} = findUser;
                return result;
            }
        } catch (error) {
            json.status(400).json({message: error.message});
        }
    }

    async validateMail(email){
        try {
            const filter = {email: email};
            return await UserModel.findOne(filter).lean();
        } catch (error) {
            json.status(400).json({message: error.message});
        }
    }
}

const usersManager = new userManager();
export default usersManager