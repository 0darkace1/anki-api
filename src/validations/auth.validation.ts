import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const registerBodyValidation = (body: any) => {
  const schema = Joi.object({
    userName: Joi.string().required().label("User Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });

  return schema.validate(body);
};

export const loginBodyValidation = (body: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(body);
};

export const refreshBodyValidation = (body: any) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required().label("Refresh Token"),
  });

  return schema.validate(body);
};
