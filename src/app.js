import express from "express";
import handlebars from 'express-handlebars';
import mongoose from "mongoose";

import __dirname from "./utils.js";

import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";

import receptorMiddleware from "./middlewares/receptor.js";

const app = express();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>console.log(`Listen on port ${PORT}`));


app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(receptorMiddleware);

app.engine("handlebars", handlebars.engine({
    extname: ".handlebars",
    runtimeOptions: {allowProtoPropertiesByDefault: true}
}));
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter);

mongoose.connect('mongodb+srv://fedetrop23:coder@codercluster.8ewf4.mongodb.net/?retryWrites=true&w=majority&appName=CoderCluster');