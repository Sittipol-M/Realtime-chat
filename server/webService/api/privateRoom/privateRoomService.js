import PrivateRoomRepository from "./privateRoomRepository.js";

class PrivateRoomService {
  constructor() {
    this.privateRoomRepository = new PrivateRoomRepository();
  }

  getPrivateRoom = async ({ receiverId, senderId }) => {
    const { isExisted } = await this.privateRoomRepository.isPrivateRoomExisted({ receiverId, senderId });
    if (!isExisted) {
      await this.privateRoomRepository.createPrivateRoom({ receiverId, senderId });
    }
    const { privateRoom } = await this.privateRoomRepository.getPrivateRoom({ receiverId, senderId });
    return { privateRoom };
  };
}

export default PrivateRoomService;
