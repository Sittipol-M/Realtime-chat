import Joi from "joi";
import ValidationError from "../../../others/errors/ValidationError.js";

class PrivateRoomValidation {
  constructor() {}

  validateGetPrivateRoom = async ({ receiverId }) => {
    const schema = Joi.object({
      receiverId: Joi.string().required(),
    });
    try {
      await schema.validateAsync({ receiverId });
    } catch (error) {
      throw new ValidationError({ message: error.message });
    }
  };
}

export default PrivateRoomValidation;
