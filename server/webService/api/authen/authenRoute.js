import { Router } from "express";
import AuthenController from "./authenController.js";
const authentication = new AuthenController();
const authRouter = Router();

authRouter.post("/login", authentication.login);
authRouter.post("/register", authentication.register);

export default authRouter;
