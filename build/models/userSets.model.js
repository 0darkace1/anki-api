"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const toJSON_plugin_1 = __importDefault(require("./plugins/toJSON.plugin"));
const userSetsSchema = new mongoose_1.default.Schema({
    user: { type: String, required: true },
    set: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Sets",
    },
}, {
    timestamps: true,
});
userSetsSchema.plugin(toJSON_plugin_1.default);
const UserSets = mongoose_1.default.model("UserSets", userSetsSchema);
exports.default = UserSets;
//# sourceMappingURL=userSets.model.js.map