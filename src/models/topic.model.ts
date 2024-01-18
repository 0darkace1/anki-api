import mongoose, { Model } from "mongoose";
import toJSON from "./plugins/toJSON.plugin";

interface ITopic {
  title: string;
  description: string;
  author: string;
  private: boolean;
  cards: number;
  image?: string;
}

const topicSchema = new mongoose.Schema<ITopic>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false, default: "" },
    author: { type: String, required: true },
    private: { type: Boolean, required: true },
    cards: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

topicSchema.plugin(toJSON);

const Topic: Model<ITopic> = mongoose.model<ITopic>("Topic", topicSchema);

export default Topic;
