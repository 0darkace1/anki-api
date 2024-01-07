import express, { Request, Response } from "express";

import Sets from "../models/set.model";
import Cards from "../models/card.model";

import UserSets from "../models/userSets.model";
import Users from "../models/user.model";
import Learnings from "../models/learning.model";

const userRoutes = express.Router();

// TODO: VALIDATE ALL INCOMING DATA
// TODO: VERIFY IF CONNECTED & USER PERMISSIONS

// ---------------------------- CRUD ------------------------------
// Get all users
userRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const users = await Users.find();

    return res.json(users);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a single user by id
userRoutes.get("/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await Users.findById(userId);

    return res.json(user);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create an user
userRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { name, photo, email, password } = req.body;

    const newUser = new Users({
      name,
      photo,
      email,
      password,
    });

    await newUser.save();

    return res.json(newUser);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update an user
userRoutes.patch("/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { name, photo, email, password } = req.body;

    const updatedUser = await Sets.findByIdAndUpdate(userId, {
      name,
      photo,
      email,
      password,
    });

    return res.json(updatedUser);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete an user by id
userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const deletedUser = await Sets.findByIdAndDelete(userId);

    if (deletedUser) {
      return res.json(deletedUser);
    }

    return res.status(404).json({
      error: "Not Found",
      message: "Unable to delete, user does not exist.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});
// ----------------------------------------------------------------

// -------------------------- User Sets ----------------------------
// Get users all favorite sets
userRoutes.get("/:userId/sets", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    //   const userSets = await UserSets.find({ user: user });
    const userSets = await UserSets.find({ user: userId }).populate("set");

    res.json(userSets);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add set to user favorites
userRoutes.post("/:userId/sets", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { setId } = req.body;

    const exist = await UserSets.findOne({ user: userId, set: setId });

    if (exist) {
      return res.status(200).json(exist);
    }

    const userSet = new UserSets({
      user: userId,
      set: setId,
    });

    userSet.save();

    res.json(userSet);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Remove set from user favorites
userRoutes.delete(
  "/:userId/sets/:setId",
  async (req: Request, res: Response) => {
    try {
      const { userId, setId } = req.params;

      const deletedFavorite = await UserSets.findOneAndDelete({
        user: userId,
        set: setId,
      });

      if (deletedFavorite) {
        return res.json(deletedFavorite);
      }

      return res.status(404).json({
        error: "Not Found",
        message: "Unable to remove, this favorite set does not exist.",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
// -----------------------------------------------------------------

// Get users all learnings
userRoutes.get("/:userId/learnings", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const userLearnings = await Learnings.find({ user: userId }).populate(
      "set"
    );

    return res.json(userLearnings);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default userRoutes;
