import GroupMessageRepository from "./groupMessageRepository.js";
class GroupMessageService {
  constructor() {
    this.groupMessageRepository = new GroupMessageRepository();
  }

  getGroupMessages = async ({ groupRoomId, userId }) => {
    const { messages } = await this.groupMessageRepository.getGroupMessages({ groupRoomId, userId });
    return { messages };
  };
}

export default GroupMessageService;
