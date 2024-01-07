"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const set_model_1 = __importDefault(require("../models/set.model"));
const userSets_model_1 = __importDefault(require("../models/userSets.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const learning_model_1 = __importDefault(require("../models/learning.model"));
const userRoutes = express_1.default.Router();
// TODO: VALIDATE ALL INCOMING DATA
// TODO: VERIFY IF CONNECTED & USER PERMISSIONS
// ---------------------------- CRUD ------------------------------
// Get all users
userRoutes.get("/", async (req, res) => {
    try {
        const users = await user_model_1.default.find();
        return res.json(users);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Get a single user by id
userRoutes.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await user_model_1.default.findById(userId);
        return res.json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Create an user
userRoutes.post("/", async (req, res) => {
    try {
        const { name, photo, email, password } = req.body;
        const newUser = new user_model_1.default({
            name,
            photo,
            email,
            password,
        });
        await newUser.save();
        return res.json(newUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Update an user
userRoutes.patch("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, photo, email, password } = req.body;
        const updatedUser = await set_model_1.default.findByIdAndUpdate(userId, {
            name,
            photo,
            email,
            password,
        });
        return res.json(updatedUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Delete an user by id
userRoutes.delete("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await set_model_1.default.findByIdAndDelete(userId);
        if (deletedUser) {
            return res.json(deletedUser);
        }
        return res.status(404).json({
            error: "Not Found",
            message: "Unable to delete, user does not exist.",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// ----------------------------------------------------------------
// -------------------------- User Sets ----------------------------
// Get users all favorite sets
userRoutes.get("/:userId/sets", async (req, res) => {
    try {
        const { userId } = req.params;
        //   const userSets = await UserSets.find({ user: user });
        const userSets = await userSets_model_1.default.find({ user: userId }).populate("set");
        res.json(userSets);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Add set to user favorites
userRoutes.post("/:userId/sets", async (req, res) => {
    try {
        const { userId } = req.params;
        const { setId } = req.body;
        const exist = await userSets_model_1.default.findOne({ user: userId, set: setId });
        if (exist) {
            return res.status(200).json(exist);
        }
        const userSet = new userSets_model_1.default({
            user: userId,
            set: setId,
        });
        userSet.save();
        res.json(userSet);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Remove set from user favorites
userRoutes.delete("/:userId/sets/:setId", async (req, res) => {
    try {
        const { userId, setId } = req.params;
        const deletedFavorite = await userSets_model_1.default.findOneAndDelete({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// -----------------------------------------------------------------
// Get users all learnings
userRoutes.get("/:userId/learnings", async (req, res) => {
    try {
        const { userId } = req.params;
        const userLearnings = await learning_model_1.default.find({ user: userId }).populate("set");
        return res.json(userLearnings);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.default = userRoutes;
//# sourceMappingURL=user.route.js.map