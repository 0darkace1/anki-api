import express, { Request, Response } from "express";

import Cards from "../models/card.model";
import Sets from "../models/set.model";

const cardsRoutes = express.Router();

// TODO: VALIDATE ALL INCOMING DATA
// TODO: VERIFY IF CONNECTED & USER PERMISSIONS

// Get all cards
cardsRoutes.get("/", async (req: Request, res: Response) => {
  try {
    console.log({ url: "GET /cards", body: req.body });

    const cards = await Cards.find();

    return res.json(cards);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a single card
cardsRoutes.get("/:cardId", async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;

    console.log({ url: "GET /cards/:cardId", body: req.body });

    const card = await Cards.findById(cardId);

    return res.json(card);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create a card
cardsRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { question, answer, set } = req.body;

    console.log({ url: "POST /cards", body: req.body });

    const newCard = new Cards({
      question,
      answer,
      set,
    });

    if (newCard) {
      await Sets.findByIdAndUpdate(set, {
        $inc: { cards: +1 },
      });
    }

    await newCard.save();

    return res.json(newCard);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a card
cardsRoutes.patch("/:cardId", async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const { question, answer, set } = req.body;

    console.log({ url: "PATCH /cards/:cardId", body: req.body });

    const updatedCard = await Cards.findByIdAndUpdate(cardId, {
      question,
      answer,
      set,
    });

    return res.json(updatedCard);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a card by id
cardsRoutes.delete("/:cardId", async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;

    console.log({ url: "DELETE /cards/:cardId", body: req.body });

    const deletedCard: any = await Cards.findByIdAndDelete(cardId);

    if (deletedCard) {
      await Sets.findByIdAndUpdate(deletedCard.set, {
        $inc: { cards: -1 },
      });

      return res.json(deletedCard);
    }

    return res.status(404).json({
      error: "Not Found",
      message: "Unable to delete, card does not exist.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default cardsRoutes;
