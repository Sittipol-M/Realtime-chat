import GroupRoomRepository from "./groupRoomRepository.js";
import DuplicatedError from "../../../others/errors/DuplicatedError.js";

class GroupService {
  constructor() {
    this.groupRoomRepository = new GroupRoomRepository();
  }
  createGroup = async ({ name, memberIds, ownerId }) => {
    const { group } = await this.groupRoomRepository.createGroup({ name, memberIds, ownerId });
    return { group };
  };

  joinGroup = async ({ groupId, userId }) => {
    const foundGroup = await this.groupMemberRepository.getUserGroup({ userId, groupId });
    if (foundGroup) throw new DuplicatedError({ message: "User already in group" });
    await this.groupMemberRepository.createGroupMembers({ groupId, memberIds: [userId], role: "MEMBER" });
  };
}

export default GroupService;
