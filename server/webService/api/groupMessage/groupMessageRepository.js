import GroupMessage from "./groupMessageModel.js";
import GroupRoom from "../groupRoom/groupRoomModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
class GroupMessageRepository {
  constructor() {}

  getGroupMessages = async ({ groupRoomId, userId }) => {
    const messages = await GroupRoom.aggregate([
      { $match: { "users._id": new ObjectId(userId), _id: new ObjectId(groupRoomId) } },
      { $lookup: { from: "group-messages", localField: "_id", foreignField: "group_id", as: "messages" } },
      { $unwind: { path: "$messages" } },
      { $sort: { messages: 1 } },
      { $project: { _id: 0, senderId: "$messages.sender_id", message: "$messages.message" } },
    ]);
    return { messages };
  };

  createGroupMessage = async ({ senderId, message, groupId }) => {
    const now = new Date();
    await GroupMessage.create({
      group_id: groupId,
      sender_id: senderId,
      message,
      created_at: now,
      updated_at: now,
    });
  };
}

export default GroupMessageRepository;
