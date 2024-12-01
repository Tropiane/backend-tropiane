import { json } from "express";
import { isValidHash } from "../utils.js";

import UserModel from "../controllers/models/user.model.js";
import usersDao from "../dao/users.dao.js";

class usersServices {
    constructor(){}
    
    async getAll(){
        return await usersDao.getAll();
    }

    async getOne(filter){
        return await usersDao.getOne(filter);
    }

    async getById(id){
        return await usersDao.getById(id);
    }

    async create(user) {
        return await usersDao.create(user);
    }

    async delete(id){
        return await usersDao.delete(id);
    }

    async update(id, user){
        return await usersDao.update(id, user);
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