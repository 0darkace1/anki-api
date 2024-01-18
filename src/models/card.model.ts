import mongoose, { Model } from "mongoose";
import { paginate, toJSON } from "./plugins";

interface ICard {
  question: string;
  answer: string;
  topic: mongoose.Schema.Types.ObjectId;
  image?: string;
}

const cardSchema = new mongoose.Schema<ICard>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    image: { type: String, required: false, default: "" },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
  },
  {
    timestamps: true,
  }
);

cardSchema.plugin(toJSON);
cardSchema.plugin(paginate);

const Card: Model<ICard> = mongoose.model<ICard>("Card", cardSchema);

export default Card;
