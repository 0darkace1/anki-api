"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const toJSON_plugin_1 = __importDefault(require("./plugins/toJSON.plugin"));
const cardSchema = new mongoose_1.default.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    image: { type: String, required: false, default: "" },
    set: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Sets",
    },
}, {
    timestamps: true,
});
cardSchema.plugin(toJSON_plugin_1.default);
const Cards = mongoose_1.default.model("Cards", cardSchema);
exports.default = Cards;
//# sourceMappingURL=card.model.js.map