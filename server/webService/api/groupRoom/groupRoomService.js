import GroupRoomRepository from "./groupRoomRepository.js";
import DuplicatedError from "../../../others/errors/DuplicatedError.js";

class GroupRoomService {
  constructor() {
    this.groupRoomRepository = new GroupRoomRepository();
  }

  getGroupRooms = async ({ userId }) => {
    const { groupRooms } = await this.groupRoomRepository.getGroupRooms({ userId });
    return { groupRooms };
  };

  createGroupRoom = async ({ name, memberIds, ownerId }) => {
    const { group } = await this.groupRoomRepository.createGroupRoom({ name, memberIds, ownerId });
    return { group };
  };

  joinGroup = async ({ groupId, userId }) => {
    const foundGroup = await this.groupMemberRepository.getUserGroup({ userId, groupId });
    if (foundGroup) throw new DuplicatedError({ message: "User already in group" });
    await this.groupMemberRepository.createGroupMembers({ groupId, memberIds: [userId], role: "MEMBER" });
  };

  getGroupRoom = async ({ userId, groupRoomId }) => {
    const { groupRoom } = await this.groupRoomRepository.getGroupRoom({ userId, groupRoomId });
    return { groupRoom };
  };
}

export default GroupRoomService;
