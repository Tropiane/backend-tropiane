import express from "express";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";

import __dirname from "./utils.js";

import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";

import receptorMiddleware from "./middlewares/receptor.js";

const PATH = "src/public/productos.json";

const app = express();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>console.log(`Listen on port ${PORT}`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

app.use(receptorMiddleware);

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.use("/", viewsRouter);


const io = new Server(server);

io.on("connection", (socketClient) => {
    console.log(`New socket conected with id: ${socketClient.id}`);

    socketClient.on("product", (data)=>{

        console.log(data);
        socketClient.emit("products", products);
    })

})

export { io };