import PrivateMessage from "./privateMessageModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

class PrivateMessageRepository {
  constructor() {}

  getPrivateMessages = async ({ privateRoomId }) => {
    const messages = await PrivateMessage.aggregate([
      { $match: { private_room_id: new ObjectId(privateRoomId) } },
      { $sort: { created_at: 1 } },
      { $project: { _id: 0, message: 1, senderId: "$sender_id" } },
    ]);
    return { messages };
  };

  createPrivateMessage = async ({ privateRoomId, senderId, message }) => {
    const now = new Date();
    await PrivateMessage.create({
      private_room_id: new ObjectId(privateRoomId),
      sender_id: new ObjectId(senderId),
      message,
      created_at: now,
      updated_at: now,
    });
  };
}

export default PrivateMessageRepository;
