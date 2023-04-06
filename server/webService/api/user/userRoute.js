import { Router } from "express";
import UserController from "./userController.js";
import checkAuth from "../../../others/middlewares/checkAuth.js";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", checkAuth, userController.getUsers);

export default userRouter;
