import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import morgan from "morgan";
import products from "./routes/products.js";
import errorHandler from "./middleware/errorHandler.js";

//Per accedere alle env variabless
dotenv.config();

const app = express();

//Connetto Database
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("API is Runnign");
});

//Route delegato al products router
app.use("/api/products", products);

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
