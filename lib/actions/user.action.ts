"use server";

import Question from "@/database/question.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";

export async function getUserById(params: any) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId }); // fixed casing to match rest of code
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return { error: "Failed to fetch user" };
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Failed to create user" };
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase(); // added missing await
    const { clerkId, updateData, path } = params;

    const updatedUser = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Failed to update user" };
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase();
    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      return { message: "User not found" };
    }

    // Delete user's questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete answers and comments associated with user._id

    return { message: "User and related data deleted successfully", user };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: "Failed to delete user" };
  }
}
