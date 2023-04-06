import PrivateMessageRepository from "./privateMessageRepository.js";

class PrivateMessageService {
  constructor() {
    this.privateMessageRepository = new PrivateMessageRepository();
  }

  getPrivateMessages = async ({ privateRoomId }) => {
    return await this.privateMessageRepository.getPrivateMessages({ privateRoomId });
  };
}

export default PrivateMessageService;
