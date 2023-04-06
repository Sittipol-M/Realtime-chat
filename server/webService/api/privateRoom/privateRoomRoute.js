import { Router } from "express";
import checkAuth from "../../../others/middlewares/checkAuth.js";
import PrivateRoomController from "./privateRoomController.js";

const privateRoomController = new PrivateRoomController();
const privateRoomRouter = Router();

privateRoomRouter.get("/:receiverId", checkAuth, privateRoomController.getPrivateRoom);

export default privateRoomRouter;
