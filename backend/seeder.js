import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Review from "./models/Review.js";
import Order from "./models/Order.js";
import colors from "colors";
import connectDB from "./config/db.js";

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await User.create(users);
    const adminUser = await User.findOne({ isAdmin: true });
    const adminId = adminUser._id;
    const adminProducts = products.map((product) => {
      return { ...product, user: adminId };
    });

    try {
      await Product.insertMany(adminProducts);
      console.log("Dati caricati...".green.inverse);
      process.exit();
    } catch (error) {
      console.log(error);
      console.log("Problema Caricamento prodotti".red);
    }
  } catch (error) {
    console.log(error);
    console.log("Problema con caricamento user".red);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Review.deleteMany();
    console.log("Dati eliminati...".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else if (process.argv[2] === "-i") {
  importData();
}
