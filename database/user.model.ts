import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  clerkID: string;
  name: string;
  email: string;
  password?: string;
  UserName: string;
  bio?: string;
  image: string;
  location?: string;
  website?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  UserName: { type: String, required: true, unique: true },
  bio: { type: String, default: "" },
  image: { type: String, default: "" },
  location: { type: String, default: "" },
  website: { type: String, default: "" },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>("Question", UserSchema);

export default User;
