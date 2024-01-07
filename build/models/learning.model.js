"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const toJSON_plugin_1 = __importDefault(require("./plugins/toJSON.plugin"));
const learningSchema = new mongoose_1.default.Schema({
    user: { type: String, required: true },
    score: { type: Number, required: true },
    cards_total: { type: Number, required: true },
    cards_wrong: { type: Number, required: true },
    cards_success: { type: Number, required: true },
    set: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Sets",
    },
}, {
    timestamps: true,
});
learningSchema.plugin(toJSON_plugin_1.default);
const Learnings = mongoose_1.default.model("Learnings", learningSchema);
exports.default = Learnings;
//# sourceMappingURL=learning.model.js.map