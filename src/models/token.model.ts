import mongoose, { Model } from "mongoose";

import toJSON from "./plugins/toJSON.plugin";
import tokenTypes from "../config/tokens";

interface IToken {
  token: string;
  user: mongoose.Schema.Types.ObjectId;
  type:
    | typeof tokenTypes.REFRESH
    | typeof tokenTypes.REFRESH
    | typeof tokenTypes.REFRESH;
  expires: Date;
  userAgent?: string | null;
  blacklisted: boolean;
}

const tokenSchema = new mongoose.Schema<IToken>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        tokenTypes.REFRESH,
        tokenTypes.RESET_PASSWORD,
        tokenTypes.VERIFY_EMAIL,
      ],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    userAgent: {
      type: String,
      required: false,
      default: null,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Token: Model<IToken> = mongoose.model<IToken>("Token", tokenSchema);

export default Token;
