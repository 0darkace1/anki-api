"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const card_model_1 = __importDefault(require("./models/card.model"));
const set_model_1 = __importDefault(require("./models/set.model"));
const seed_1 = require("./seed");
const sets_route_1 = __importDefault(require("./routes/sets.route"));
const cards_route_1 = __importDefault(require("./routes/cards.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const learnings_route_1 = __importDefault(require("./routes/learnings.route"));
dotenv_1.default.config();
const PORT = process.env.PORT || 9000;
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "50mb" }));
app.get("/", async (req, res) => {
    const sets = await set_model_1.default.find();
    return res.json({ results: sets });
});
app.use("/user", user_route_1.default);
app.use("/learnings", learnings_route_1.default);
app.use("/sets", sets_route_1.default);
app.use("/cards", cards_route_1.default);
app.listen(PORT, () => {
    mongoose_1.default
        .connect(process.env.MONGO_URL || "")
        .then(() => {
        console.log("Successfully connected to MongoDB.");
        seedDatabase();
    })
        .catch((err) => console.error("MongoDB connection error", err));
    console.log(`Listening on: http://localhost:${PORT}`);
});
async function seedDatabase() {
    const dbSets = await set_model_1.default.find();
    const cards = await card_model_1.default.find();
    if (dbSets.length === 0) {
        console.log("Seeding Sets...");
        seed_1.setsData.forEach(async (seedSet) => {
            const newSet = new set_model_1.default({
                _id: new mongoose_1.default.Types.ObjectId(seedSet.id),
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
        seed_1.cardsCapitals.forEach(async (seedCard) => {
            const newCard = new card_model_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                question: seedCard.question,
                answer: seedCard.answer,
                set: seedCard.set,
            });
            await newCard.save();
        });
        seed_1.cardsProgramming.forEach(async (seedCard) => {
            const newCard = new card_model_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                question: seedCard.question,
                answer: seedCard.answer,
                set: seedCard.set,
            });
            await newCard.save();
        });
        console.log("Cards Seeded");
    }
}
//# sourceMappingURL=index.js.map