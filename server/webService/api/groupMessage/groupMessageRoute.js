import { Router } from "express";
import GroupMessageController from "./groupMessageController.js";

const groupMessageRouter = Router();

groupMessageRouter.get("/");

export default groupMessageRouter;
