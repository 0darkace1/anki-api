"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = exports.generateSalt = exports.verifyRefreshToken = exports.generateTokens = exports.generateAccessToken = exports.generateRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_model_1 = __importDefault(require("../models/token.model"));
const ACCESS_TOKEN_DURATION = "14m";
const REFRESH_TOKEN_DURATION = "30d";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "mysupersecretaccesstoken";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "mysupersecretrefreshtoken";
const SALT = process.env.SALT || "mysupersecretsalt";
const generateRefreshToken = async (payload) => {
    const refreshToken = jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_DURATION,
    });
    return refreshToken;
};
exports.generateRefreshToken = generateRefreshToken;
const generateAccessToken = async (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_DURATION,
    });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
const generateTokens = async (user) => {
    try {
        const payload = { _id: user._id, roles: user.roles };
        const accessToken = (0, exports.generateAccessToken)(payload);
        const refreshToken = (0, exports.generateRefreshToken)(payload);
        const userToken = await token_model_1.default.findOne({ userId: user._id });
        if (userToken)
            await token_model_1.default.findByIdAndDelete(userToken._id);
        await new token_model_1.default({ userId: user._id, token: refreshToken }).save();
        return Promise.resolve({ accessToken, refreshToken });
    }
    catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};
exports.generateTokens = generateTokens;
const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        token_model_1.default.findOne({ token: refreshToken }, (err, doc) => {
            if (!doc) {
                return reject({ error: true, message: "Invalid refresh token" });
            }
            jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, tokenDetails) => {
                if (err) {
                    return reject({ error: true, message: "Invalid refresh token" });
                }
                resolve(tokenDetails);
            });
        });
    });
};
exports.verifyRefreshToken = verifyRefreshToken;
const generateSalt = async () => {
    return await bcrypt_1.default.genSalt(Number(SALT));
};
exports.generateSalt = generateSalt;
const hashPassword = async (password, salt) => {
    return await bcrypt_1.default.hash(password, salt);
};
exports.hashPassword = hashPassword;
const verifyPassword = async (password, bodyPassword) => {
    return await bcrypt_1.default.compare(password, bodyPassword);
};
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=auth.utils.js.map