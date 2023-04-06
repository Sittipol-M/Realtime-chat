import mongoose from "mongoose";

const schema = new mongoose.Schema({
  private_room_id: {
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

export default mongoose.model("private-messages", schema);
