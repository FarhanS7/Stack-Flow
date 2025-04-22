import { Document, Schema, model, models } from "mongoose";

export interface ITags extends Document {
  name: string;
  description: string;
  createdAt: Date;

  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
}

const TagSchema = new Schema({});

const Tags = models.User || model<ITags>("Question", TagSchema);

export default Tags;
