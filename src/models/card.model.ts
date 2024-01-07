import mongoose, { Model } from "mongoose";
import toJSON from "./plugins/toJSON.plugin";

interface ICard {
  question: string;
  answer: string;
  set: mongoose.Schema.Types.ObjectId;
  image?: string;
}

const cardSchema = new mongoose.Schema<ICard>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    image: { type: String, required: false, default: "" },
    set: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sets",
    },
  },
  {
    timestamps: true,
  }
);

cardSchema.plugin(toJSON);

const Cards: Model<ICard> = mongoose.model<ICard>("Cards", cardSchema);

export default Cards;
