"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const set_model_1 = __importDefault(require("../models/set.model"));
const card_model_1 = __importDefault(require("../models/card.model"));
const userSets_model_1 = __importDefault(require("../models/userSets.model"));
const learning_model_1 = __importDefault(require("../models/learning.model"));
const setsRoutes = express_1.default.Router();
// TODO: VALIDATE ALL INCOMING DATA
// TODO: VERIFY IF CONNECTED & USER PERMISSIONS
// Get all sets
setsRoutes.get("/", async (req, res) => {
    try {
        const sets = await set_model_1.default.find({ private: false });
        return res.json(sets);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Get a single set
setsRoutes.get("/:setId", async (req, res) => {
    try {
        const { setId } = req.params;
        const set = await set_model_1.default.findById(setId);
        return res.json(set);
    }
    catch (err) {
        return res
            .status(500)
            .json({ error: true, message: "Internal error occurred" });
    }
});
// Create a set
setsRoutes.post("/", async (req, res) => {
    try {
        const { title, description, image, private: isPrivate, author } = req.body;
        const newSet = new set_model_1.default({
            title,
            description,
            image,
            private: isPrivate,
            author,
        });
        await newSet.save();
        return res.json(newSet);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Update a set
setsRoutes.patch("/:setId", async (req, res) => {
    try {
        const { setId } = req.params;
        const { title, description, image, private: isPrivate, creator } = req.body;
        const updatedSet = await set_model_1.default.findByIdAndUpdate(setId, {
            title,
            description,
            image,
            private: isPrivate,
            creator,
        });
        return res.json(updatedSet);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Delete a set by id
setsRoutes.delete("/:setId", async (req, res) => {
    try {
        const { setId } = req.params;
        const deletedSet = await set_model_1.default.findByIdAndDelete(setId);
        const userSetsToDelete = await userSets_model_1.default.find({ set: setId });
        const userLearningsToDelete = await learning_model_1.default.find({ set: setId });
        userSetsToDelete.forEach(async (userSet) => {
            await userSets_model_1.default.findByIdAndDelete(userSet.id);
        });
        userLearningsToDelete.forEach(async (userSet) => {
            await learning_model_1.default.findByIdAndDelete(userSet.id);
        });
        if (deletedSet) {
            return res.json(deletedSet);
        }
        return res.status(404).json({
            error: "Not Found",
            message: "Unable to delete, set does not exist.",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Get all cards for given set
setsRoutes.get("/:setId/cards", async (req, res) => {
    try {
        const { setId } = req.params;
        const cards = await card_model_1.default.find({ set: setId });
        return res.json(cards);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Learn a specific number of cards for given set
setsRoutes.get("/:setId/learn", async (req, res) => {
    try {
        const { setId } = req.params;
        const { limit = 5 } = req.query;
        console.log({ setId });
        console.log({ limit });
        const cards = await card_model_1.default.find({ set: setId });
        // console.log({ cards });
        const randomCards = cards
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
            .slice(0, +limit);
        // console.log({ randomCards });
        return res.json(randomCards);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.default = setsRoutes;
//# sourceMappingURL=sets.route.js.map