import PrivateRoomService from "./privateRoomService.js";
import PrivateRoomValidation from "./privateRoomValidation.js";

class PrivateRoomController {
  constructor() {
    this.privateRoomValidation = new PrivateRoomValidation();
    this.privateRoomService = new PrivateRoomService();
  }

  getPrivateRoom = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const { receiverId } = req.params;
      const senderId = req.user.id;
      console.log({ receiverId, senderId });
      await this.privateRoomValidation.validateGetPrivateRoom({ receiverId });
      const { privateRoom } = await this.privateRoomService.getPrivateRoom({ receiverId, senderId });
      res.send({ success: true, message: "Get private room successful", body: { privateRoom } });
    } catch (error) {
      next(error);
    }
  };
}

export default PrivateRoomController;
