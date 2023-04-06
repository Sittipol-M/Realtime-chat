import bcrypt from "bcryptjs";

class PasswordUtil {
  hashPassword = ({ password }) => {
    const SALT_ROUND = Number(process.env.SALT_ROUND);
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(SALT_ROUND, (error, salt) => {
        if (error) reject(error);
        bcrypt.hash(password, salt, (error, hashedPassword) => {
          if (error) reject(error);
          resolve({ hashedPassword });
        });
      });
    });
  };

  comparePassword = ({ password, hashedPassword }) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashedPassword, (error, result) => {
        if (error) reject(error);
        else resolve({ result });
      });
    });
  };
}

export default PasswordUtil;
