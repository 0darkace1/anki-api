import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { seedDatabase } from "./seed";

import adminRoutes from "./routes/admin.route";
import userRoutes from "./routes/user.route";
import learningsRoutes from "./routes/learnings.route";
import setsRoutes from "./routes/sets.route";
import cardsRoutes from "./routes/cards.route";

dotenv.config();

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json({ limit: "50mb" }));

app.get("/", async (req: Request, res: Response) => {
  return res.status(200).json({ message: "ANKI CLONE API - v0.2" });
});

app.use("/admin", adminRoutes);

app.use("/user", userRoutes);
app.use("/learnings", learningsRoutes);
app.use("/sets", setsRoutes);
app.use("/cards", cardsRoutes);

app.listen(PORT, () => {
  mongoose
    .connect(
      process.env.MONGO_URL || "mongodb://anki_database:27017/anki-clone"
    )
    .then(() => {
      console.log("Successfully connected to MongoDB.");

      seedDatabase();
    })
    .catch((err) => console.error("MongoDB connection error", err));

  console.log(`Listening on: http://localhost:${PORT}`);
});
