import jwt from "jsonwebtoken";

class JwtUtil {
  generateJWT = ({ data }) => {
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    return new Promise((resolve, reject) => {
      jwt.sign(data, SECRET_KEY, (err, token) => {
        if (err) reject(err);
        else resolve({ token });
      });
    });
  };

  verifyJWT = ({ token }) => {
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const decode = jwt.decode(token, SECRET_KEY);
    return { ...decode };
  };
}

export default JwtUtil;
