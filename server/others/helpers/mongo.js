import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const isValidObjectIdMongoDB = ({ id }) => {
  const isValid = ObjectId.isValid(id);
  return isValid;
};

export { isValidObjectIdMongoDB };
