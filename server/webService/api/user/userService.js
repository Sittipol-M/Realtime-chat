import UserRepository from "./userRepository.js";


class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  getUsers = async () => {
    return await this.userRepository.getUsers();
  };
}

export default UserService;
