import mongoose, { Document } from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, require: true },
  name: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
