import { Router } from "express";
import PrivateMessageController from "./privateMessageController.js";
import checkAuth from "../../../others/middlewares/checkAuth.js";
const privateMessageController = new PrivateMessageController();
const privateMessageRouter = Router();

privateMessageRouter.get("/:privateRoomId/messages", checkAuth, privateMessageController.getPrivateMessages);

export default privateMessageRouter;
