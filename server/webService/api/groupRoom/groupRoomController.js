import GroupRoomService from "./groupRoomService.js";
import GroupRoomValidation from "./groupRoomValidation.js";

class GroupRoomController {
  constructor() {
    this.groupRoomService = new GroupRoomService();
    this.groupRoomValidation = new GroupRoomValidation();
  }

  getGroupRooms = async (req, res, next) => {
    try {
      const { id: userId } = req.user;
      const { groupRooms } = await this.groupRoomService.getGroupRooms({ userId });
      res.send({ success: true, message: "Get group rooms successful", body: { groupRooms } });
    } catch (error) {
      next(error);
    }
  };

  getGroupRoom = async (req, res, next) => {
    try {
      const { id: userId } = req.user;
      const { groupRoomId } = req.params;
      await this.groupRoomValidation.validateGetGroupRoom({ groupRoomId });
      const { groupRoom } = await this.groupRoomService.getGroupRoom({ userId, groupRoomId });
      res.send({ success: true, message: "Get group room successful", body: { groupRoom } });
    } catch (error) {
      next(error);
    }
  };

  createGroupRoom = async (req, res, next) => {
    try {
      const { name, memberIds } = req.body;
      const ownerId = req.user.id;
      await this.groupRoomValidation.validateCreate({ name, memberIds, ownerId });
      const { group } = await this.groupRoomService.createGroupRoom({ name, memberIds, ownerId });
      res.send({ success: true, message: "Created group successful", body: { group } });
    } catch (error) {
      next(error);
    }
  };

  joinGroupRoom = async (req, res, next) => {
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
