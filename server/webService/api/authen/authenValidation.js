import Joi from "joi";
import ValidationError from "../../../others/errors/ValidationError.js";

class AuthenValidation {
  constructor() {}

  validateLogin = async ({ telOrEmail, password }) => {
    const schema = Joi.object({
      telOrEmail: Joi.string().required(),
      password: Joi.string().required(),
    });
    try {
      await schema.validateAsync({ telOrEmail, password });
    } catch (error) {
      throw new ValidationError({ message: error.message });
    }
  };

  validateRegister = async ({ name, password, repeatPassword, tel, email }) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required(),
      repeatPassword: Joi.ref("password"),
      tel: Joi.string()
        .pattern(/^[0-9]+$/)
        .required(),
      email: Joi.string().email().required(),
    }).with("password", "repeatPassword");
    try {
      await schema.validateAsync({ name, password, repeatPassword, tel, email });
    } catch (error) {
      throw new ValidationError({ message: error.message });
    }
  };
}

export default AuthenValidation;
