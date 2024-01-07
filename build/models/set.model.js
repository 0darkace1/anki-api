"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const toJSON_plugin_1 = __importDefault(require("./plugins/toJSON.plugin"));
const setSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false, default: "" },
    author: { type: String, required: true },
    private: { type: Boolean, required: true },
    cards: { type: Number, default: 0 },
}, {
    timestamps: true,
});
setSchema.plugin(toJSON_plugin_1.default);
const Sets = mongoose_1.default.model("Sets", setSchema);
exports.default = Sets;
//# sourceMappingURL=set.model.js.map