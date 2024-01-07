"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshBodyValidation = exports.loginBodyValidation = exports.registerBodyValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
const registerBodyValidation = (body) => {
    const schema = joi_1.default.object({
        userName: joi_1.default.string().required().label("User Name"),
        email: joi_1.default.string().email().required().label("Email"),
        password: (0, joi_password_complexity_1.default)().required().label("Password"),
    });
    return schema.validate(body);
};
exports.registerBodyValidation = registerBodyValidation;
const loginBodyValidation = (body) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required().label("Email"),
        password: joi_1.default.string().required().label("Password"),
    });
    return schema.validate(body);
};
exports.loginBodyValidation = loginBodyValidation;
const refreshBodyValidation = (body) => {
    const schema = joi_1.default.object({
        refreshToken: joi_1.default.string().required().label("Refresh Token"),
    });
    return schema.validate(body);
};
exports.refreshBodyValidation = refreshBodyValidation;
//# sourceMappingURL=auth.validation.js.map