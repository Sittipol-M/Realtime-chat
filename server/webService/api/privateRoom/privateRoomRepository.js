import PrivateRoom from "./privateRoomModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

class PrivateRoomRepository {
  constructor() {}
  getPrivateRoom = async ({ receiverId, senderId }) => {
    const [privateRoom] = await PrivateRoom.aggregate([
      { $match: { $and: [{ users: new ObjectId(receiverId) }, { users: new ObjectId(senderId) }] } },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $project: {
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
    return { privateRoom };
  };

  createPrivateRoom = async ({ receiverId, senderId }) => {
    const now = new Date();
    const newRoom = await PrivateRoom.create({
      users: [new ObjectId(receiverId), new ObjectId(senderId)],
      created_at: now,
      updated_at: now,
    });
    return { newRoom };
  };

  isPrivateRoomExisted = async ({ receiverId, senderId }) => {
    const privateRoom = await PrivateRoom.findOne({
      $and: [{ users: new ObjectId(receiverId) }, { users: new ObjectId(senderId) }],
    }).select({
      _id: 1,
    });
    return { isExisted: privateRoom ? true : false };
  };
}

export default PrivateRoomRepository;
