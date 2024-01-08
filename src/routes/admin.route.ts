import express, { Request, Response } from "express";

import Cards from "../models/card.model";
import Sets from "../models/set.model";
import UserSets from "../models/userSets.model";
import Learnings from "../models/learning.model";
import { seedDatabase } from "../seed";

const adminRoutes = express.Router();

// TODO: VALIDATE ALL INCOMING DATA
// TODO: VERIFY IF CONNECTED & USER PERMISSIONS

adminRoutes.get("/init", async (req: Request, res: Response) => {
  try {
    console.log({ url: "GET /admin/init", body: req.body });

    await Cards.collection.drop();
    await Learnings.collection.drop();
    await Sets.collection.drop();
    await UserSets.collection.drop();

    await seedDatabase();

    return res.json({ message: "Successfully initialized!" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default adminRoutes;
