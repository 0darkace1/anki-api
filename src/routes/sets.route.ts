import express, { Request, Response } from "express";

import Sets from "../models/set.model";
import Cards from "../models/card.model";
import UserSets from "../models/userSets.model";
import Learnings from "../models/learning.model";

const setsRoutes = express.Router();

// TODO: VALIDATE ALL INCOMING DATA
// TODO: VERIFY IF CONNECTED & USER PERMISSIONS

// Get all sets
setsRoutes.get("/", async (req: Request, res: Response) => {
  try {
    console.log({ req: "GET /sets", body: req.body });

    const sets = await Sets.find({ private: false });

    return res.json(sets);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a single set
setsRoutes.get("/:setId", async (req: Request, res: Response) => {
  try {
    const { setId } = req.params;

    console.log({ req: "GET /sets/:cardId", body: req.body });

    const set = await Sets.findById(setId);

    return res.json(set);
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Internal error occurred" });
  }
});

// Create a set
setsRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description, image, private: isPrivate, author } = req.body;

    console.log({ req: "POST /sets", body: req.body });

    const newSet = new Sets({
      title,
      description,
      image,
      private: isPrivate,
      author,
    });

    await newSet.save();

    return res.json(newSet);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a set
setsRoutes.patch("/:setId", async (req: Request, res: Response) => {
  try {
    const { setId } = req.params;
    const { title, description, image, private: isPrivate, creator } = req.body;

    console.log({ req: "PATCH /sets/:setId", body: req.body });

    const updatedSet = await Sets.findByIdAndUpdate(setId, {
      title,
      description,
      image,
      private: isPrivate,
      creator,
    });

    return res.json(updatedSet);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a set by id
setsRoutes.delete("/:setId", async (req: Request, res: Response) => {
  try {
    const { setId } = req.params;

    console.log({ req: "DELETE /sets/:setId", body: req.body });

    const deletedSet = await Sets.findByIdAndDelete(setId);

    const userSetsToDelete = await UserSets.find({ set: setId });
    const userLearningsToDelete = await Learnings.find({ set: setId });

    userSetsToDelete.forEach(async (userSet) => {
      await UserSets.findByIdAndDelete(userSet.id);
    });
    userLearningsToDelete.forEach(async (userSet) => {
      await Learnings.findByIdAndDelete(userSet.id);
    });

    if (deletedSet) {
      return res.json(deletedSet);
    }

    return res.status(404).json({
      error: "Not Found",
      message: "Unable to delete, set does not exist.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all cards for given set
setsRoutes.get("/:setId/cards", async (req: Request, res: Response) => {
  try {
    const { setId } = req.params;

    console.log({ req: "GET /sets/cards", body: req.body });

    const cards = await Cards.find({ set: setId });

    return res.json(cards);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Learn a specific number of cards for given set
setsRoutes.get("/:setId/learn", async (req: Request, res: Response) => {
  try {
    const { setId } = req.params;
    const { limit = 5 } = req.query;

    console.log({ req: "GET /sets/learn", body: req.body });

    // console.log({ setId });
    // console.log({ limit });

    const cards = await Cards.find({ set: setId });

    // console.log({ cards });

    const randomCards = cards
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, +limit!);

    // console.log({ randomCards });

    return res.json(randomCards);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default setsRoutes;
