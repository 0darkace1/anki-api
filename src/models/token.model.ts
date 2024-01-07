import mongoose, { Model } from "mongoose";
import toJSON from "./plugins/toJSON.plugin";

interface IToken {
  userId: mongoose.Schema.Types.ObjectId;
  token: string;
  createdAt: mongoose.Schema.Types.Date;
}

const tokenSchema = new mongoose.Schema<IToken>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 30 * 86400 }, // 30 Days
});

tokenSchema.plugin(toJSON);

const Tokens: Model<IToken> = mongoose.model<IToken>("Tokens", tokenSchema);

export default Tokens;
