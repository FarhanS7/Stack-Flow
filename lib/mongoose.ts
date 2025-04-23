// lib/mongoose.ts
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) {
    console.error("❌ MONGODB_URL not defined in environment.");
    return;
  }

  if (isConnected) {
    console.log("✅ MongoDB already connected.");
    return;
  }

  try {
    await mongoose.connect(mongoUrl, {
      dbName: "Stack_Flow",
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // Optional: stop the app on failure
  }
};

// Event listeners for better logging
mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose connected!");
});
