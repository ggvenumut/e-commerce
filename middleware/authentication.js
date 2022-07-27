import { isTokenValid } from "../utils/index.js";

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new Error("Authentication Invalid");
  }

  try {
    const { name, userID, role } = isTokenValid({ token });
    req.user = { name, userID, role };
    next();
  } catch (err) {
    throw new Error("Authentication Invalid 2");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Error("Unauthorized to access this route");
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };
