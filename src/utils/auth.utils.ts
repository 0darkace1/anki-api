import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Tokens from "../models/token.model";

const ACCESS_TOKEN_DURATION = "14m";
const REFRESH_TOKEN_DURATION = "30d";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "mysupersecretaccesstoken";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "mysupersecretrefreshtoken";
const SALT = process.env.SALT || "mysupersecretsalt";

export const generateRefreshToken = async (payload: {
  _id: string;
  roles: string[];
}) => {
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_DURATION,
  });

  return refreshToken;
};

export const generateAccessToken = async (payload: {
  _id: string;
  roles: string[];
}) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_DURATION,
  });

  return accessToken;
};

export const generateTokens = async (user: any) => {
  try {
    const payload = { _id: user._id, roles: user.roles };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const userToken = await Tokens.findOne({ userId: user._id });
    if (userToken) await Tokens.findByIdAndDelete(userToken._id);

    await new Tokens({ userId: user._id, token: refreshToken }).save();

    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);

    return Promise.reject(error);
  }
};

export const verifyRefreshToken = async (refreshToken: string) => {
  return new Promise((resolve, reject) => {
    Tokens.findOne({ token: refreshToken }, (err: any, doc: any) => {
      if (!doc) {
        return reject({ error: true, message: "Invalid refresh token" });
      }

      jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
        (err, tokenDetails: any) => {
          if (err) {
            return reject({ error: true, message: "Invalid refresh token" });
          }

          resolve(tokenDetails);
        }
      );
    });
  });
};

export const generateSalt = async () => {
  return await bcrypt.genSalt(Number(SALT));
};

export const hashPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (
  password: string,
  bodyPassword: string
) => {
  return await bcrypt.compare(password, bodyPassword);
};
