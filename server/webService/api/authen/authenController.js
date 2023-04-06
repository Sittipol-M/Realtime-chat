import AuthenService from "./authenService.js";
import AuthenValidation from "./authenValidation.js";

class AuthenController {
  constructor() {
    this.authenService = new AuthenService();
    this.authenValidation = new AuthenValidation();
  }

  login = async (req, res, next) => {
    try {
      const { telOrEmail, password } = req.body;
      await this.authenValidation.validateLogin({ telOrEmail, password });
      const { body } = await this.authenService.login({ telOrEmail, password });
      res.send({ success: true, message: "Login successful", httpCode: 200, body });
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      const { name, password, repeatPassword, tel, email } = req.body;
      await this.authenValidation.validateRegister({ name, password, repeatPassword, tel, email });
      await this.authenService.register({ name, password, repeatPassword, tel, email });
      res.send({ success: true, message: "Register successful", httpCode: 200 });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthenController;
