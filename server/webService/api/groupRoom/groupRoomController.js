import GroupRoomService from "./groupRoomService.js";
import GroupRoomValidation from "./groupRoomValidation.js";

class GroupRoomController {
  constructor() {
    this.groupRoomService = new GroupRoomService();
    this.GroupRoomValidation = new GroupRoomValidation();
  }

  createGroup = async (req, res, next) => {
    try {
      const { name, memberIds } = req.body;
      const ownerId = req.user.id;
      await this.GroupRoomValidation.validateCreate({ name, memberIds, ownerId });
      const { group } = await this.groupRoomService.createGroup({ name, memberIds, ownerId });
      res.send({ success: true, message: "Created group successful", body: { group } });
    } catch (error) {
      next(error);
    }
  };

  joinGroup = async (req, res, next) => {
    try {
      const { groupId } = req.body;
      const userId = req.user.id;
      await this.groupValidation.validateJoin({ groupId });
      await this.groupService.joinGroup({ groupId, userId });
      res.send({ success: true, message: "Joined group successful", body: "body" });
    } catch (error) {
      next(error);
    }
  };
}

export default GroupRoomController;
