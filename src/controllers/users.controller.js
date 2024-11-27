import usersServices from "../services/users.service.js";
const service = new usersServices();

class usersController {
    constructor(){}
    
    async getAll(){
        try {
            return await service.getAll();
        } catch (error) {
            console.log(error);
            
        }
    }

    async getOne(filter){
        try {
            return await service.getOne(filter);
        } catch (error) {
            console.log(error);
            
        }
    }

    async getById(id){
        try {
            return await service.findById(id);
        } catch (error) {
            console.log(error);
            
        }
    }

    async create(user) {
        try {
            return await service.create(user);
        } catch (error) {
            if (error.code === 11000) { 
                throw new Error("Email already exists");
            }
            throw error;
        }
    }

    async delete(id){
        try {
            return await service.delete(id);
        } catch (error) {
            console.log(error);
            
        }
    }

    async update(id, user){
        try {
            return await service.update(id, user);
        } catch (error) {
            console.log(error);
            
        }
    }

    async authenticate(username, password){
        try {
            return await service.authenticate(username, password);
        } catch (error) {
            json.status(400).json({message: error.message});
        }
    }

    //use on middleware Register
    async validateMail(email){
        try {
            return await service.validateMail(email);
        } catch (error) {
            json.status(400).json({message: error.message});
        }
    }
}

export default usersController