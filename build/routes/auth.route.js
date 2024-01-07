"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_validation_1 = require("../validations/auth.validation");
const user_model_1 = __importDefault(require("../models/user.model"));
const token_model_1 = __importDefault(require("../models/token.model"));
const auth_utils_1 = require("../utils/auth.utils");
const authRoutes = express_1.default.Router();
// Signup User
authRoutes.post("/register", async (req, res) => {
    try {
        const { error } = (0, auth_validation_1.registerBodyValidation)(req.body);
        if (error) {
            return res
                .status(400)
                .json({ error: true, message: error.details[0].message });
        }
        const user = await user_model_1.default.findOne({ email: req.body.email });
        if (user) {
            return res
                .status(400)
                .json({ error: true, message: "User with given email already exist" });
        }
        const salt = await (0, auth_utils_1.generateSalt)();
        const hashedPassword = await (0, auth_utils_1.hashPassword)(req.body.password, salt);
        const newUser = await new user_model_1.default({
            ...req.body,
            password: hashedPassword,
        }).save();
        delete newUser.password;
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
});
// Login User
authRoutes.post("/login", async (req, res) => {
    try {
        const { error } = (0, auth_validation_1.loginBodyValidation)(req.body);
        if (error) {
            return res
                .status(400)
                .json({ error: true, message: error.details[0].message });
        }
        const user = await user_model_1.default.findOne({ email: req.body.email });
        const verifiedPassword = await (0, auth_utils_1.verifyPassword)(user.password, req.body.password);
        if (!user || !verifiedPassword) {
            return res
                .status(401)
                .json({ error: true, message: "Invalid email or password" });
        }
        const { accessToken, refreshToken } = await (0, auth_utils_1.generateTokens)(user);
        res.status(200).json({
            error: false,
            accessToken,
            refreshToken,
            message: "Logged in successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
});
// Get new Access Token
authRoutes.post("/refresh", async (req, res) => {
    const { error } = (0, auth_validation_1.refreshBodyValidation)(req.body);
    if (error) {
        return res
            .status(400)
            .json({ error: true, message: error.details[0].message });
    }
    (0, auth_utils_1.verifyRefreshToken)(req.body.refreshToken)
        .then((tokenDetails) => {
        const accessToken = (0, auth_utils_1.generateAccessToken)(tokenDetails);
        res.status(200).json({
            error: false,
            accessToken,
            message: "Access Token created successfully",
        });
    })
        .catch((error) => {
        console.error(error);
        res.status(400).json(error);
    });
});
// Logout User
authRoutes.post("/logout", async (req, res) => {
    try {
        const { error } = (0, auth_validation_1.refreshBodyValidation)(req.body);
        if (error) {
            return res
                .status(400)
                .json({ error: true, message: error.details[0].message });
        }
        const userToken = await token_model_1.default.findOne({ token: req.params.refreshToken });
        if (!userToken) {
            return res
                .status(200)
                .json({ error: true, message: "Logged Out Successfully" });
        }
        await token_model_1.default.findOneAndDelete({ token: userToken.token });
        return res
            .status(200)
            .json({ error: true, message: "Logged Out Successfully" });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
});
exports.default = authRoutes;
//# sourceMappingURL=auth.route.js.map