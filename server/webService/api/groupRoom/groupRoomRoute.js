import { Router } from "express";
import GroupRoomController from "./groupRoomController.js";
import checkAuth from "../../../others/middlewares/checkAuth.js";

const groupRoomController = new GroupRoomController();
const groupRoomRouter = Router();

groupRoomRouter.post("/", checkAuth, groupRoomController.createGroup);
groupRoomRouter.post("/join", checkAuth, groupRoomController.joinGroup);

export default groupRoomRouter;
