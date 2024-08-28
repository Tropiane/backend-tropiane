import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import receptorMiddleware from "./middlewares/receptor.js";

const app = express();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>console.log(`Listen on port ${PORT}`));

app.use(express.json());

app.use(receptorMiddleware);

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

