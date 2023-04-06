import { Router } from "express";
import GroupMessageController from "./groupMessageController.js";
import checkAuth from "../../../others/middlewares/checkAuth.js";

const groupMessageRouter = Router();
const groupMessageController = new GroupMessageController();

groupMessageRouter.get("/:groupRoomId/messages", checkAuth, groupMessageController.getGroupMessages);

export default groupMessageRouter;
