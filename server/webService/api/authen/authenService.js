import PasswordUtil from "../../../others/helpers/password.js";
import UserRepository from "../user/userRepository.js";
import UnauthorizedError from "../../../others/errors/UnauthorizedError.js";
import DuplicatedError from "../../../others/errors/DuplicatedError.js";
import JwtUtil from "../../../others/helpers/jwt.js";

class AuthenService {
  constructor() {
    this.userRepository = new UserRepository();
    this.passwordUtil = new PasswordUtil();
    this.jwtUtil = new JwtUtil();
  }

  login = async ({ telOrEmail, password: loginPassword }) => {
    const foundUser = await this.userRepository.getUserByEmailOrTel({ telOrEmail });
    if (!foundUser) {
      throw new UnauthorizedError({ message: "`email` or `tel` not found" });
    }
    const { _id: id, name, password: hashedPassword, tel, email } = foundUser;
    const user = { id, name, email, tel };
    const [{ result: isSamePassword }, { token: authToken }] = await Promise.all([
      this.passwordUtil.comparePassword({ password: loginPassword, hashedPassword }),
      this.jwtUtil.generateJWT({ data: user }),
    ]);
    if (!isSamePassword) {
      throw new UnauthorizedError({ message: "`password` is incorrect" });
    }
    return { body: { user, authToken } };
  };

  register = async ({ name, password, repeatPassword, tel, email }) => {
    const [foundUser, { hashedPassword }] = await Promise.all([
      this.userRepository.getUserByEmailOrTel({ email, tel }),
      this.passwordUtil.hashPassword({ password }),
    ]);
    if (foundUser) {
      throw new DuplicatedError({ message: `User was created` });
    }
    await this.userRepository.createUser({ name, password: hashedPassword, tel, email });
  };
}

export default AuthenService;
