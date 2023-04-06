import Group from "./groupRoomModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

class GroupRoomRepository {
  constructor() {}
  createGroup = async ({ name, memberIds, ownerId }) => {
    const now = new Date();
    // owner
    const users = [{ id: new ObjectId(ownerId), role: "OWNER", updated: now, joined_at: now }];
    // members
    for (const memberId of memberIds) {
      users.push({ id: new ObjectId(memberId), role: "MEMBER", updated: now, joined_at: now });
    }
    const group = await Group.create({
      name,
      users,
      created_at: now,
      updated_at: now,
    });
    return { group };
  };
}

export default GroupRoomRepository;
