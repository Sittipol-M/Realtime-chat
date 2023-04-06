import User from "./userModel.js";

class UserRepository {
  constructor() {}

  getUserByEmailOrTel = async ({ telOrEmail }) => {
    return await User.findOne({ $or: [{ tel: telOrEmail }, { email: telOrEmail }] })
      .lean()
      .select({ _id: 1, email: 1, tel: 1, password: 1, name: 1 });
  };

  createUser = async ({ name, password, tel, email }) => {
    const user = { name, password, tel, email, create_at: new Date(), updated_at: new Date() };
    await User.create(user);
  };

  getUsers = async () => {
    return await User.aggregate([
      { $sort: { name: 1 } },
      {
        $project: {
          _id: 0,
          name: 1,
          id: "$_id",
        },
      },
    ]);
  };
}

export default UserRepository;
