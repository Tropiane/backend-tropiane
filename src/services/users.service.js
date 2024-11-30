import { json } from "express";
import UserModel from "../controllers/models/user.model.js";
import { createHash, isValidHash } from "../utils.js";

class usersServices {
    constructor(){}
    
    async getAll(){
        try {
            const users = await UserModel.find().lean();
            const {password, ...result} = users;
            return result;
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

export default usersServices;