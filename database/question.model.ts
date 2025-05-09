import { Document, Schema, model, models } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  option: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema({
  title: { type: String, required: true },
  option: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  views: { type: Number, default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Question =
  models.Question || model<IQuestion>("Question", QuestionSchema);

export default Question;
