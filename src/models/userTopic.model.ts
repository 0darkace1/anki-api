import mongoose, { Model } from "mongoose";
import toJSON from "./plugins/toJSON.plugin";

interface IUserTopic {
  user: string;
  topic: mongoose.Schema.Types.ObjectId;
}

const userTopicSchema = new mongoose.Schema<IUserTopic>(
  {
    user: { type: String, required: true },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Topic",
    },
  },
  {
    timestamps: true,
  }
);

userTopicSchema.plugin(toJSON);

const UserTopic: Model<IUserTopic> = mongoose.model<IUserTopic>(
  "UserTopic",
  userTopicSchema
);

export default UserTopic;
