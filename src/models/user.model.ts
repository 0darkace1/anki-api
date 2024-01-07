import mongoose, { Model } from "mongoose";
import toJSON from "./plugins/toJSON.plugin";

export interface IUser {
  photo: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
}

const userSchema = new mongoose.Schema<IUser>(
  {
    photo: { type: String },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: {
      type: [String],
      enum: ["user", "admin", "super_admin"],
      default: ["user"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);

const Users: Model<IUser> = mongoose.model<IUser>("Users", userSchema);

export default Users;
