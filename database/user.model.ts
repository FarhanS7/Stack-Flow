import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  UserName: string;
  bio: string;
  image: string;
  location: string;
  website: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  UserName: { type: String, required: true, unique: true },
  bio: { type: String, default: "" },
  image: { type: String, default: "" },
  location: { type: String, default: "" },
  website: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>("Question", UserSchema);

export default User;
