import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Cards from "./models/card.model";
import Sets from "./models/set.model";

import { cardsCapitals, cardsProgramming, setsData } from "./seed";
import setsRoutes from "./routes/sets.route";
import cardsRoutes from "./routes/cards.route";
import userRoutes from "./routes/user.route";
import learningsRoutes from "./routes/learnings.route";

dotenv.config();

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json({ limit: "50mb" }));

app.get("/", async (req: Request, res: Response) => {
  const sets = await Sets.find();

  return res.json({ results: sets });
});

app.use("/user", userRoutes);

app.use("/learnings", learningsRoutes);
app.use("/sets", setsRoutes);
app.use("/cards", cardsRoutes);

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URL || "")
    .then(() => {
      console.log("Successfully connected to MongoDB.");

      seedDatabase();
    })
    .catch((err) => console.error("MongoDB connection error", err));

  console.log(`Listening on: http://localhost:${PORT}`);
});

async function seedDatabase() {
  const dbSets = await Sets.find();
  const cards = await Cards.find();

  if (dbSets.length === 0) {
    console.log("Seeding Sets...");

    setsData.forEach(async (seedSet) => {
      const newSet = new Sets({
        _id: new mongoose.Types.ObjectId(seedSet.id),
        title: seedSet.title,
        description: seedSet.description,
        author: seedSet.author,
        private: seedSet.private,
        cards: seedSet.cards,
      });

      await newSet.save();
    });

    console.log("Sets Seeded");
  }

  if (cards.length === 0) {
    console.log("Seeding Cards...");

    cardsCapitals.forEach(async (seedCard) => {
      const newCard = new Cards({
        _id: new mongoose.Types.ObjectId(),
        question: seedCard.question,
        answer: seedCard.answer,
        set: seedCard.set,
      });

      await newCard.save();
    });

    cardsProgramming.forEach(async (seedCard) => {
      const newCard = new Cards({
        _id: new mongoose.Types.ObjectId(),
        question: seedCard.question,
        answer: seedCard.answer,
        set: seedCard.set,
      });

      await newCard.save();
    });

    console.log("Cards Seeded");
  }
}
