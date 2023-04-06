import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  tel: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["online", "offline"],
    default: "offline",
  },
  email: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    require: true,
  },
  updated_at: {
    type: Date,
    require: true,
  },
});

export default mongoose.model("users", schema);
