import UserController from "../controllers/users.controller.js";

class userManager {
    constructor(){}
    
    async getAll(){
        try {
            return await UserController.getAll();
        } catch (error) {
            console.log(error);
            
        }
    }

    async getOne(filter){
        try {
            return await UserController.getOne(filter);
        } catch (error) {
            console.log(error);
            
        }
    }

    async getById(id){
        try {
            return await UserController.findById(id);
        } catch (error) {
            console.log(error);
            
        }
    }

    async create(user) {
        try {
            return await UserController.create(user);
        } catch (error) {
            if (error.code === 11000) { 
                throw new Error("Email already exists");
            }
            throw error;
        }
    }

    async delete(id){
        try {
            return await UserController.delete(id);
        } catch (error) {
            console.log(error);
            
        }
    }

    async update(id, user){
        try {
            return await UserController.update(id, user);
        } catch (error) {
            console.log(error);
            
        }
    }

    async authenticate(username, password){
        try {
            return await UserController.authenticate(username, password);
        } catch (error) {
            json.status(400).json({message: error.message});
        }
    }

    //use on middleware Register
    async validateMail(email){
        try {
            return await UserController.validateMail(email);
        } catch (error) {
            json.status(400).json({message: error.message});
        }
    }
}

const usersManager = new userManager();
export default usersManager