import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
//Route
import products from "./routes/products.js";
import auth from "./routes/auth.js";
import shipping from "./routes/shipping.js";
import order from "./routes/order.js";
//Midlleware
import errorHandler from "./middleware/errorHandler.js";

//Per accedere alle env variabless
dotenv.config();

const app = express();

//Connetto Database
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is Runnign");
});

//Route delegato al products router
app.use("/api/products", products);

//Route delegato al auht router
app.use("/api/auth", auth);

//Route per ottenere shipping address
app.use("/api/shipping", shipping);

//Route per gestire gli ordini
app.use("/api/order", order);

//Middleware che gestisce errori di default
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server Running on port ${PORT} in ${process.env.NODE_ENV}`)
);

//Quando ci sono problemi l'app crasha invece di continuare a funzionare
process.on("unhandledRejection", (err, promise) => {
  console.log(`Errore: ${err.message}`);
  server.close(() => process.exit(1));
});
