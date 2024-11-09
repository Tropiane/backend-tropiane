import express from "express";
import handlebars from 'express-handlebars';
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookeParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import { Server } from "socket.io";

import config from "./config.js";
import __dirname from "./utils.js";

import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import userRouter from "./routes/user.router.js";
import cookiesRouter from "./routes/cookies.router.js";
import sessionsRouter from "./routes/sessions.router.js";

import receptorMiddleware from "./middlewares/receptor.js";

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(receptorMiddleware);

app.use(cors({origin: "*"}));
app.use(cookeParser(config.SECRET));
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MONGODB_URI,
        ttl: 600,
        mongoOptions: {}
    }),
    secret: config.SECRET, 
    resave: true, 
    saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine({
    extname: ".handlebars",
    runtimeOptions: {allowProtoPropertiesByDefault: true}
}));

app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter);
app.use("/api/users", userRouter)
app.use("/api/cookies", cookiesRouter);
app.use("/api/sessions", sessionsRouter)

const httpServer = app.listen(config.PORT, async() => {
    await mongoose.connect(config.MONGODB_URI);
    console.log(`Server activo en puerto ${config.PORT}, conectado a bbdd`);
    
    const socketServer = new Server(httpServer);
    socketServer.on('connection', socket => {
        console.log(`Nuevo cliente conectado con id ${socket.id}`);
    
        socket.on('init_message', data => {
            console.log(data);
        });
    
        socket.emit('welcome', `Bienvenido cliente, estás conectado con el id ${socket.id}`);

    });
    httpServer.on("rejectLogin", data => {
        httpServer.emit("errorLogin", data);
    })

});


export default httpServer;
mongoose.connect(config.MONGODB_URI);