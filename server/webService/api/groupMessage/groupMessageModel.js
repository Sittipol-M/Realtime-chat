import mongoose from "mongoose";

const schema = new mongoose.Schema({
  group_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  sender_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("group-messages", schema);
