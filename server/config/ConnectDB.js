import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("No MONGODB_URI in .env file");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // connect to our database
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};
