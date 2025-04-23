"use server";

import Question from "@/database/question.model";
import Tags from "@/database/tags.model";
import { connectToDatabase } from "../mongoose";

export async function createQuestion(params: any) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    // Create a new question object

    const question = await Question.create({
      title,
      content,
      tags,
      author,
    });

    const tagDocuments = [];

    // Create the tags if they don't exist

    for (const tag of tags) {
      const existingTag = await Tags.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    // Update the question with the tag IDs
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // create an interaction  record for the user's ask_question action

    // Increment author's Reputation by +5
  } catch (error) {}
}
