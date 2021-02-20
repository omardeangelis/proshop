import mongoose from "mongoose";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI_3_6, options);
    console.log(`Database Connected from ${conn.connection.host}`.green);
  } catch (error) {
    try {
      const conn = await mongoose.connect(
        process.env.MONGO_DB_URI_2_2,
        options
      );
      console.log(
        `Database Connected at second attempt from ${conn.connection.host}`
          .yellow
      );
    } catch (error) {
      console.log(err);
    }
  }
};

export default connectDB;
