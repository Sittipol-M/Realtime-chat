import Joi from "joi";
import ValidationError from "../../../others/errors/ValidationError.js";

class GroupMessageValidation {
  constructor() {}

  validateGroupMessages = async ({ groupRoomId }) => {
    const schema = Joi.object({
      groupRoomId: Joi.string().required(),
    });
    try {
      await schema.validateAsync({ groupRoomId });
    } catch (error) {
      throw new ValidationError({ message: error.message });
    }
  };
}

export default GroupMessageValidation;
