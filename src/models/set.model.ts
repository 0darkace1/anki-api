import mongoose, { Model } from "mongoose";
import toJSON from "./plugins/toJSON.plugin";

interface ISet {
  title: string;
  description: string;
  author: string;
  private: boolean;
  cards: number;
  image?: string;
}

const setSchema = new mongoose.Schema<ISet>(
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

setSchema.plugin(toJSON);

const Sets: Model<ISet> = mongoose.model<ISet>("Sets", setSchema);

export default Sets;
