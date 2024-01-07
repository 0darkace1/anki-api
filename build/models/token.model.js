"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const toJSON_plugin_1 = __importDefault(require("./plugins/toJSON.plugin"));
const tokenSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 30 * 86400 }, // 30 Days
});
tokenSchema.plugin(toJSON_plugin_1.default);
const Tokens = mongoose_1.default.model("Tokens", tokenSchema);
exports.default = Tokens;
//# sourceMappingURL=token.model.js.map