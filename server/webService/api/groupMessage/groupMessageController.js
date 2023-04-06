import GroupMessageService from "./groupMessageService.js";
import GroupMessageValidation from "./groupMessageValidation.js";

class GroupMessageController {
  constructor() {
    this.groupMessageService = new GroupMessageService();
    this.groupMessageValidation = new GroupMessageValidation();
  }

  getGroupMessages = async (req, res, next) => {
    try {
      const { id: userId } = req.user;
      const { groupRoomId } = req.params;
      await this.groupMessageValidation.validateGroupMessages({ groupRoomId });
      const { messages } = await this.groupMessageService.getGroupMessages({ groupRoomId, userId });
      res.send({ success: true, message: "Get group messages successful", body: { messages } });
    } catch (error) {
      next(error);
    }
  };
}

export default GroupMessageController;
