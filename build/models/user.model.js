"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const toJSON_plugin_1 = __importDefault(require("./plugins/toJSON.plugin"));
const userSchema = new mongoose_1.default.Schema({
    photo: { type: String },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: {
        type: [String],
        enum: ["user", "admin", "super_admin"],
        default: ["user"],
    },
}, {
    timestamps: true,
});
userSchema.plugin(toJSON_plugin_1.default);
const Users = mongoose_1.default.model("Users", userSchema);
exports.default = Users;
//# sourceMappingURL=user.model.js.map