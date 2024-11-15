import { json } from "express";
import UserModel from "../models/user.model.js";
import { createHash, isValidHash } from "../utils.js";

class userManager {
    constructor(){}
    
    async getAll(){
        try {
            return await UserModel.find().lean();
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
            return await UserModel.findById(id);
        } catch (error) {
            console.log(error);
            
        }
    }

    async create(user) {
        try {
            user.password = createHash(user.password);

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
            const findUser = await UserModel.findOne({email: username}).lean();

            if(findUser && isValidHash(password, findUser.password)){
                const {password, ...result} = findUser;
                return result;
            }
        } catch (error) {
            json.status(400).json({message: error.message});
        }
    }

    //use on middleware Register
    async validateMail(email){
        try {
            return await UserModel.findOne({email: email}).lean();
        } catch (error) {
            json.status(400).json({message: error.message});
        }
    }
}

const usersManager = new userManager();
export default usersManager