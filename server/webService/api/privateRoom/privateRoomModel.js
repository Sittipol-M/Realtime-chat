import mongoose from "mongoose";

const schema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("private-rooms", schema);
