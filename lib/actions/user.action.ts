"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams } from "./shared.types";

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
export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log("Error fetching user by ID:", error);
    return error;
  }
}
