import mongoose from "mongoose";
import config from "../config.js";

export default class MongoSingleton {
    static #instance;

    constructor() {
        this.connect()
    }

    async connect() {
        await mongoose.connect(config.MONGODB_URI);
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new MongoSingleton();
            console.log("Conectado a la base de datos");
        }else{
            console.log("Ya conectado a la base de datos");
            
        }
        return this.#instance;
    }
}