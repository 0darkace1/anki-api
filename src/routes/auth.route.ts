import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";

import {
  loginBodyValidation,
  refreshBodyValidation,
  registerBodyValidation,
} from "../validations/auth.validation";

import Users, { IUser } from "../models/user.model";
import Tokens from "../models/token.model";

import {
  generateAccessToken,
  generateSalt,
  generateTokens,
  hashPassword,
  verifyPassword,
  verifyRefreshToken,
} from "../utils/auth.utils";

const authRoutes = express.Router();

// Signup User
authRoutes.post("/register", async (req: Request, res: Response) => {
  try {
    const { error } = registerBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: true, message: "User with given email already exist" });
    }

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(req.body.password, salt);

    const newUser: Omit<IUser, "password"> = await new Users({
      ...req.body,
      password: hashedPassword,
    }).save();

    delete (newUser as Partial<Pick<IUser, "password">>).password;

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// Login User
authRoutes.post("/login", async (req: Request, res: Response) => {
  try {
    const { error } = loginBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    const user = await Users.findOne({ email: req.body.email });
    const verifiedPassword = await verifyPassword(
      user!.password,
      req.body.password
    );

    if (!user || !verifiedPassword) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    res.status(200).json({
      error: false,
      accessToken,
      refreshToken,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// Get new Access Token
authRoutes.post("/refresh", async (req: Request, res: Response) => {
  const { error } = refreshBodyValidation(req.body);

  if (error) {
    return res
      .status(400)
      .json({ error: true, message: error.details[0].message });
  }

  verifyRefreshToken(req.body.refreshToken)
    .then((tokenDetails: any) => {
      const accessToken = generateAccessToken(tokenDetails);

      res.status(200).json({
        error: false,
        accessToken,
        message: "Access Token created successfully",
      });
    })
    .catch((error) => {
      console.error(error);

      res.status(400).json(error);
    });
});

// Logout User
authRoutes.post("/logout", async (req: Request, res: Response) => {
  try {
    const { error } = refreshBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    const userToken = await Tokens.findOne({ token: req.params.refreshToken });
    if (!userToken) {
      return res
        .status(200)
        .json({ error: true, message: "Logged Out Successfully" });
    }

    await Tokens.findOneAndDelete({ token: userToken.token });

    return res
      .status(200)
      .json({ error: true, message: "Logged Out Successfully" });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

export default authRoutes;
