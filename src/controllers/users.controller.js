import UserService from "../services/factory.service.js";
const service = new UserService();

class UserController {
    constructor(){}
    
    async getAll(){
        return await service.getAll();
    }

    async getOne(filter){
            return await service.getOne(filter);
    }

    async getById(id){
            return await service.getById(id);
    }

    async create(user) {
            return await service.create(user);
    }

    async delete(id){
            return await service.delete(id);
    }

    async update(id, user){
            return await service.update(id, user);
    }

    async authenticate(username, password){
            return await service.authenticate(username, password);
    }

    //use on middleware Register
    async validateMail(email){
            return await service.validateMail(email);
    }
}

export default UserController