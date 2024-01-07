import mongoose, { Model } from "mongoose";
import toJSON from "./plugins/toJSON.plugin";

interface ILearning {
  user: string;
  score: number;
  cards_total: number;
  cards_wrong: number;
  cards_success: number;
  set: mongoose.Schema.Types.ObjectId;
}

const learningSchema = new mongoose.Schema<ILearning>(
  {
    user: { type: String, required: true },
    score: { type: Number, required: true },
    cards_total: { type: Number, required: true },
    cards_wrong: { type: Number, required: true },
    cards_success: { type: Number, required: true },
    set: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sets",
    },
  },
  {
    timestamps: true,
  }
);

learningSchema.plugin(toJSON);

const Learnings: Model<ILearning> = mongoose.model<ILearning>(
  "Learnings",
  learningSchema
);

export default Learnings;
