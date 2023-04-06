import GroupRoom from "./groupRoomModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

class GroupRoomRepository {
  constructor() {}

  getGroupRoom = async ({ userId, groupRoomId }) => {
    const [groupRoom] = await GroupRoom.aggregate([
      { $match: { "users._id": new ObjectId(userId), _id: new ObjectId(groupRoomId) } },
      { $lookup: { from: "users", localField: "users._id", foreignField: "_id", as: "users" } },
      {
        $project: {
          "users.created_at": 0,
          "users.password": 0,
          "users.updated_at": 0,
          "users.status": 0,
          "users.__v": 0,
          created_at: 0,
          updated_at: 0,
          __v: 0,
        },
      },
    ]);
    return { groupRoom };
  };

  getGroupRooms = async ({ userId }) => {
    const groupRooms = await GroupRoom.find({ "users._id": new ObjectId(userId) }).select({ name: 1 });
    return { groupRooms };
  };

  createGroupRoom = async ({ name, memberIds, ownerId }) => {
    const now = new Date();
    // owner
    const users = [{ _id: new ObjectId(ownerId), role: "OWNER", updated: now, joined_at: now }];
    // members
    for (const memberId of memberIds) {
      users.push({ _id: new ObjectId(memberId), role: "MEMBER", updated: now, joined_at: now });
    }
    const group = await GroupRoom.create({
      name,
      users,
      created_at: now,
      updated_at: now,
    });
    return { group };
  };
}

export default GroupRoomRepository;
