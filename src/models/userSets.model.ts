import mongoose, { Model } from "mongoose";
import toJSON from "./plugins/toJSON.plugin";

interface IUserSets {
  user: string;
  set: mongoose.Schema.Types.ObjectId;
}

const userSetsSchema = new mongoose.Schema<IUserSets>(
  {
    user: { type: String, required: true },
    set: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Sets",
    },
  },
  {
    timestamps: true,
  }
);

userSetsSchema.plugin(toJSON);

const UserSets: Model<IUserSets> = mongoose.model<IUserSets>(
  "UserSets",
  userSetsSchema
);

export default UserSets;
