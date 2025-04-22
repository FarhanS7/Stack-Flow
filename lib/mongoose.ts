import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config(); // Load environment variables from .env file

let isConnected: boolean = false; // track the connection status

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true); // Set strictQuery to true

  if (!process.env.MONGODB_URL)
    return console.log("Please define the MONGODB_URL ");
  if (isConnected) {
    return console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Stack Flow",
    });

    isConnected = true; // Update the connection status
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
