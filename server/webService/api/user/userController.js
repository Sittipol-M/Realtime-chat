import UserService from "./userService.js";
class UserController {
  constructor() {
    this.userService = new UserService();
  }
  getUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getUsers();
      res.send({ success: true, message: "Get users successful", body: { users } });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
