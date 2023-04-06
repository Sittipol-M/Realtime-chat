import { Router } from "express";
import GroupRoomController from "./groupRoomController.js";
import checkAuth from "../../../others/middlewares/checkAuth.js";

const groupRoomController = new GroupRoomController();
const groupRoomRouter = Router();

groupRoomRouter.get("/", checkAuth, groupRoomController.getGroupRooms);
groupRoomRouter.post("/", checkAuth, groupRoomController.createGroupRoom);
groupRoomRouter.post("/join", checkAuth, groupRoomController.joinGroupRoom);
groupRoomRouter.get("/:groupRoomId", checkAuth, groupRoomController.getGroupRoom);

export default groupRoomRouter;
