import config from "../config.js";

let service;

try {
    switch (config.PERSISTENCE) {
        case "mongodb":
            const {default: Mongo} = await import("../services/users.service.js");
            service = Mongo;
            break;

            case "mysql":
            const {default: MySql} = await import("../services/users.service.js");
            service = MySql;
            break;
        default:
            throw new Error("Persistence not found");
            
    }
} catch (error) {
    console.log("error generando servicio de base de datos", error.message);
    throw error;
    
}

const UserService = service;

export default UserService;