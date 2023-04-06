import Joi from "joi";
import ValidationError from "../../../others/errors/ValidationError.js";

class PrivateMessageValidation {
  constructor() {}
  validateGetPrivateMessages = async ({ privateRoomId }) => {
    const schema = Joi.object({
      privateRoomId: Joi.string().required(),
    });
    try {
      await schema.validateAsync({ privateRoomId });
    } catch (error) {
      throw new ValidationError({ message: error.message });
    }
  };
}

export default PrivateMessageValidation;
