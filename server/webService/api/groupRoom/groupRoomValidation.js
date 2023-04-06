import Joi from "joi";
import ValidationError from "../../../others/errors/ValidationError.js";

class GroupValidation {
  constructor() {}

  validateCreate = async ({ name, memberIds, ownerId }) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().required(),
      memberIds: Joi.array().items(Joi.string().invalid(ownerId)).min(1).required(),
    });
    try {
      await schema.validateAsync({ name, memberIds });
    } catch (error) {
      throw new ValidationError({ message: error.message });
    }
  };

  validateJoin = async ({ groupId }) => {
    const schema = Joi.object({
      groupId: Joi.string().required(),
    });
    try {
      await schema.validateAsync({ groupId });
    } catch (error) {
      throw new ValidationError({ message: error.message });
    }
  };

  validateGetGroupRoom = async ({ groupRoomId }) => {
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

export default GroupValidation;
