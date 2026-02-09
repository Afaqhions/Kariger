import mongoose from "mongoose";
import env from "dotenv";
env.config();

export const connToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
    process.exit(1);
  }
}