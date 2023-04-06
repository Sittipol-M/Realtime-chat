import JwtUtil from "../helpers/jwt.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";

const jwt = new JwtUtil();

const checkAuth = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) throw new UnauthorizedError({ message: "jwt is required" });
  req.user = jwt.verifyJWT({ token: authToken });
  next();
};

export default checkAuth;
