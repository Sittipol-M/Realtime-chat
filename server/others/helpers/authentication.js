import UnauthorizedError from "../errors/UnauthorizedError.js";
import { verifyJWT } from "./jwt.js";

const checkAuth = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) throw new UnauthorizedError({ message: "Authorization header is required" });
  const decodedJWT = verifyJWT({ token });

  if (Object.keys(decodedJWT).length === 0) throw new UnauthorizedError({ message: "Authorization header is invalid" });
  const { userId: id, tel, email } = decodedJWT;
  req.user = { id, tel, email };
  next();
};

export { checkAuth };
