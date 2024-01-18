import mongoose, { Model } from "mongoose";
import { paginate, toJSON } from "./plugins";

interface ILearning {
  user: string;
  score: number;
  cards_total: number;
  cards_wrong: number;
  cards_success: number;
  topic: mongoose.Schema.Types.ObjectId;
}

const learningSchema = new mongoose.Schema<ILearning>(
  {
    user: { type: String, required: true },
    score: { type: Number, required: true },
    cards_total: { type: Number, required: true },
    cards_wrong: { type: Number, required: true },
    cards_success: { type: Number, required: true },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topics",
    },
  },
  {
    timestamps: true,
  }
);

learningSchema.plugin(toJSON);
learningSchema.plugin(paginate);

const Learning: Model<ILearning> = mongoose.model<ILearning>(
  "Learning",
  learningSchema
);

export default Learning;
