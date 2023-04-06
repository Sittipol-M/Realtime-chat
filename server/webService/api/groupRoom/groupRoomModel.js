import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  users: [
    {
      id: { type: mongoose.Types.ObjectId, require: true },
      role: { type: String, enum: ["OWNER", "MEMBER"], require: true },
      updated_at: { type: Date, require: true },
      joined_at: { type: Date, require: true },
    },
  ],
  created_at: {
    type: Date,
    require: true,
  },
  updated_at: {
    type: Date,
    require: true,
  },
});

export default mongoose.model("group-rooms", schema);
