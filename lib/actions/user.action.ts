"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

export async function getUserById(params: any) {
  try {
    await connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkID: userId });
    return user;
  } catch (error) {
    console.log("Error fetching user by ID:", error);
    return error;
  }
}
