import { Router } from "express";
import authRouter from "../api/authen/authenRoute.js";
import groupRoomRouter from "../api/groupRoom/groupRoomRoute.js";
import privateMessageRouter from "../api/privateMessage/privateMessageRoute.js";
import userRouter from "../api/user/userRoute.js";
import groupMessageRouter from "../api/groupMessage/groupMessageRoute.js";
import privateRoomRouter from "../api/privateRoom/privateRoomRoute.js";

const router = Router();

router.use("/", authRouter);
router.use("/group-rooms", groupRoomRouter);
router.use("/group-rooms", groupMessageRouter);
router.use("/private-rooms", privateRoomRouter);
router.use("/private-rooms", privateMessageRouter);
router.use("/users", userRouter);

export default router;
