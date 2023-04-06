import PrivateMessageValidation from "./privateMessageValidation.js";
import PrivateMessageService from "./privateMessageService.js";

class PrivateMessageController {
  constructor() {
    this.privateMessageValidation = new PrivateMessageValidation();
    this.privateMessageService = new PrivateMessageService();
  }
  getPrivateMessages = async (req, res, next) => {
    try {
      const { privateRoomId } = req.params;
      await this.privateMessageValidation.validateGetPrivateMessages({ privateRoomId });
      const { messages } = await this.privateMessageService.getPrivateMessages({ privateRoomId });
      await res.send({ success: true, message: "Get private messages successful", body: { messages } });
    } catch (error) {
      next(error);
    }
  };
}

export default PrivateMessageController;
