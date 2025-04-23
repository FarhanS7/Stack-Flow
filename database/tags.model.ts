import { Document, Schema, model, models } from "mongoose";

export interface ITags extends Document {
  name: string;
  description: string;
  createdAt: Date;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Tags = models.User || model<ITags>("Tags", TagSchema);

export default Tags;
