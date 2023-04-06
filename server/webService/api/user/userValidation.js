// import Joi from "joi";
// import ValidationError from "../../../others/errors/ValidationError.js";

// const validateRegisterBody = async ({ body }) => {
//   const schema = Joi.object({
//     name: Joi.string().required(),
//     password: Joi.string().required(),
//     repeatPassword: Joi.ref("password"),
//     tel: Joi.string()
//       .pattern(/^[0-9]+$/)
//       .required(),
//     email: Joi.string().email().required(),
//   }).with("password", "repeatPassword");
//   try {
//     await schema.validateAsync(body);
//   } catch (error) {
//     throw new ValidationError({ message: error.message });
//   }
// };

// const validateLoginBody = async ({ body }) => {
//   const schema = Joi.object({
//     tel: Joi.string().pattern(/^[0-9]+$/),
//     email: Joi.string().email(),
//     password: Joi.string().required(),
//   });
//   try {
//     await schema.validateAsync(body);
//   } catch (error) {
//     throw new ValidationError({ message: error.message });
//   }
// };

// export { validateRegisterBody, validateLoginBody };

class userValidation {
  validateLogin = async ({ tel, email, password }) => {
    const schema = Joi.object({
      tel: Joi.string().pattern(/^[0-9]+$/),
      email: Joi.string().email(),
      password: Joi.string().required(),
    });
    try {
      await schema.validateAsync(body);
    } catch (error) {
      throw new ValidationError({ message: error.message });
    }
  };
}

export default userValidation;
