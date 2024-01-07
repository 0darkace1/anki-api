"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const card_model_1 = __importDefault(require("../models/card.model"));
const set_model_1 = __importDefault(require("../models/set.model"));
const cardsRoutes = express_1.default.Router();
// TODO: VALIDATE ALL INCOMING DATA
// TODO: VERIFY IF CONNECTED & USER PERMISSIONS
// Get all cards
cardsRoutes.get("/", async (req, res) => {
    try {
        const cards = await card_model_1.default.find();
        return res.json(cards);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Get a single card
cardsRoutes.get("/:cardId", async (req, res) => {
    try {
        const { cardId } = req.params;
        const card = await card_model_1.default.findById(cardId);
        return res.json(card);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Create a card
cardsRoutes.post("/", async (req, res) => {
    try {
        const { question, answer, set } = req.body;
        const newCard = new card_model_1.default({
            question,
            answer,
            set,
        });
        if (newCard) {
            await set_model_1.default.findByIdAndUpdate(set, {
                $inc: { cards: +1 },
            });
        }
        await newCard.save();
        return res.json(newCard);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Update a card
cardsRoutes.patch("/:cardId", async (req, res) => {
    try {
        const { cardId } = req.params;
        const { question, answer, set } = req.body;
        const updatedCard = await card_model_1.default.findByIdAndUpdate(cardId, {
            question,
            answer,
            set,
        });
        return res.json(updatedCard);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Delete a card by id
cardsRoutes.delete("/:cardId", async (req, res) => {
    try {
        const { cardId } = req.params;
        const deletedCard = await card_model_1.default.findByIdAndDelete(cardId);
        if (deletedCard) {
            await set_model_1.default.findByIdAndUpdate(deletedCard.set, {
                $inc: { cards: -1 },
            });
            return res.json(deletedCard);
        }
        return res.status(404).json({
            error: "Not Found",
            message: "Unable to delete, card does not exist.",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.default = cardsRoutes;
//# sourceMappingURL=cards.route.js.map