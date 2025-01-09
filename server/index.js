import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/ConnectDB.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
